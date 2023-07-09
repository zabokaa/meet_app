import { loadFeature, defineFeature } from 'jest-cucumber';
import  userEvent  from '@testing-library/user-event';
import { render, within, waitFor} from '@testing-library/react';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('The user has not specified a number, 32 is the default number', ({ given, when, then }) => {
        let AppComponent;
        let AppDOM;
        given('the user has not specified the number of events', () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
        });

        let EventListItems;
        let EventListDOM;
        when('the user views the events list', async () => {

            console.log('EventListDOM:', EventListDOM);   //checking where is the error

            EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');

            console.log('EventListItems:', EventListItems);

            expect(EventListItems.lenght).toBeGreaterThan(0);
            })
        });

        then(/^the default number of events displayed should be (\d+)$/, (arg0) => {
            expect(EventListItems.lenght).toBe(32);
        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        given('the user is viewing the events list', () => {

        });

        when('the user specifies a new number of events they want to see', () => {

        });

        then('the events list should be updated to display the specified number of events', () => {

        });
    });
});