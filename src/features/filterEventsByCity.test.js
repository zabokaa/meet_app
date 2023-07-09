import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

// scenario 1
defineFeature(feature, test => {
    test('The user has not searched for a city, show upcoming events from all cities', ({ given, when, then }) => {
        given('user has not searched for any city', () => {    //nothing has happened yet

        });
        
        let AppComponent;
        when('the user opens the app', () => {
            AppComponent = render(<App />);   //user opening the app
        });

        let AppDOM;
        let EventListDOM;
        then('the user should see a list of all upcoming events', async () => {  //
            AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

// scenario 2
    test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {

        let AppComponent;
        given('the main page is open', () => {
            AppComponent = render(<App />);
        });

        let CitySearchDOM;  //--> needed in then part as well
        when('user starts typing in the city textbox', async () => {     //simulatin clicking text box and typing Berlin into it
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
            await user.type(citySearchInput, "Berlin");
        });

        then('the user should see a list of cities that match what they have typed', async () => {
                const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
                expect(suggestionListItems).toHaveLength(2);     //2 because of the searched citiy and the option"see all cities"
                });
        });
});

// scenario 3  --- the ERROR IS HERE >> BUT WHERE ??

    test('User can select a city from the suggested list', ({ given, and, when, then }) => {

        let AppComponent;
        let AppDOM; 
        let CitySearchDOM;
        let CitySearchInput;

        given('the user was typing Berlin in the city textbox', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            CitySearchInput = within(CitySearchDOM).queryByRole('textbox');  
            await user.type(CitySearchInput, "Berlin");
        });

        let suggestionListItems;
        and('the list of suggested cities is showing', () => {
            suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
            expect(suggestionListItems).toHaveLength(2);
        });

        when('the user selects a city from the list', async () => {
            const user = userEvent.setup();
            await user.click(suggestionListItems[0]);
        });

        then('their city should be changed to that city', () => {
            expect(CitySearchInput.value).toHaveValue("Berlin, Germany");
        });

        and('the user should receive a list of upcoming events in that city', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const allEvents = await getEvents();

            // filtering the list of all events down to events located in Germany
            // citySearchInput.value should have the value "Berlin, Germany" at this point
            const berlinEvents = allEvents.filter(event => event.location === CitySearchInput.value)
            expect(EventListItems).toHaveLength(berlinEvents.length);
    });
    });
