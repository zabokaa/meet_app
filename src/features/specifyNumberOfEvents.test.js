import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    
    test('When the user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('the user hasn\'t specified the number of events', () => {

        });

        when('the user views the events list', () => {

        });

        then(/^the default number of events displayed should be (\d+)$/, (arg0) => {

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