import { loadFeature, defineFeature } from 'jest-cucumber';
import  userEvent  from '@testing-library/user-event';
import { render, within, waitFor, queryByText } from '@testing-library/react';
import App from '../App';



const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {

        let AppComponent;
        given('an event element is present in the app', () => {     // user just opened the app
            AppComponent = render(<App />);
        });

        let AppDOM;
        let EventListItems;
        when('the user views the event list', async () => {       // !!!!! await only with async !!
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
            });
        });

        then('the event element should be in a collapsed state by default', async () => {
            await waitFor(() => {
                EventListItems.forEach(eventListItem => {
                  expect(eventListItem.querySelector('.details')).not.toBeInTheDocument();
                });
            });
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {

        let AppComponent;
        given('an event element in a collapsed state', () => {      //just opening app
            AppComponent = render(<App />);
        });

        let AppDOM;
        let EventListItems;
        let ButtonClicked;
        when('the user clicks on the event element', async () => {       // waiting for event: click on tdetails button
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            
            await waitFor(() => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                ButtonClicked = within(EventListItems[0]).queryByText('show details');
            })
            await user.click(ButtonClicked);
        });

        then('the event details should be displayed, showing more information about the event', () => {
            const details = EventListItems[0].querySelector('.details');
            expect(details).toBeInTheDocument();
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then, and }) => {

        let AppDOM;
        let ButtonClicked;
        let EventListItems;
        given('an expanded event element', async () => {       //user can see event details : reapeat steps from above
            const user = userEvent.setup();
            const AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                ButtonClicked = within(EventListItems[0]).queryByText('show details');
            });
            await user.click(ButtonClicked);
            expect(EventListItems[0].querySelector('.details')).toBeInTheDocument();
            });

        when('the user clicks on the event element', async () => {
            const user = userEvent.setup();
            await user.click(ButtonClicked);
        });

        then('the event details should be hidden, collapsing the event element', () => {
            expect(EventListItems[0].querySelector('.details')).not.toBeInTheDocument();
        });

        and('showing less information about the event', () => {

        });
    });
});
