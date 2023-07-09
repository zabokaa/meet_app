import { loadFeature, defineFeature } from 'jest-cucumber';
import  userEvent  from '@testing-library/user-event';
import { render, within, waitFor} from '@testing-library/react';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('The user has not specified a number, 32 is the default number', ({ given, when, then }) => {

        let AppDOM;
        let AppComponent;
        given('the user has not specified the number of events', () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
    });


        let EventListItems
        when('the user views the events list', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
            });
    });

        then(/^the default number of events displayed should be (\d+)$/, (arg0) => {
            expect(EventListItems.length).toBe(32);
        });
    });

// scenario 2:
    test('User can change the number of events they want to see', ({ given, when, then }) => {

        let AppDOM;
        let AppComponent;
        given('the user is viewing the events list', () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
        });

        when('the user specifies a new number of events they want to see', async () => {
            const user = userEvent.setup();
            const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
            const numberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');
            await user.type(numberOfEventsInput, "{backspace}{backspace}5");
            expect(numberOfEventsInput.value).toBe("5");
        });
        
        then('the events list should be updated to display the specified number of events', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(5);
            });
        });
    });
});