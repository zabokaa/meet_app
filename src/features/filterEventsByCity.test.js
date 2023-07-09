import { render, within, waitFor } from '@testing-library/react';
import { loadFeature} from 'jest-cucumber';  //loading gherkin file - from root - and defining code f the feature
import App from '../App';
import userEvent from '@testing-library/user-event';
import { defineFeature } from 'jest-cucumber';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

// scenario 1
defineFeature(feature, test => {

    test('WHEN USER HAS NOT SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES', ({ given, when, then }) => {
        given('user has not searched for any city', () => {    //nothing has happened yet

        });
        
        let AppComponent;
        when('the user opens the app', () => {
            AppComponent = render(<App />);   //user opening the app
        });

        then('the user should see a list of all upcoming events', async () => {  //
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

// scenario 2
    test('USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY', ({ given, when, then }) => {

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

// scenario 3
test('USER CAN SELECT A CITY FROM THE SUGGESTED LIST', ({ given, and, when, then }) => {

    let AppComponent;
    let AppDOM; 
    let CitySearchDOM;
    let CitySearchInput;

    given('the user was typing “Berlin” in the city textbox', async () => {
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
        expect(CitySearchInput.value).toBe('Berlin, Germany');

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
