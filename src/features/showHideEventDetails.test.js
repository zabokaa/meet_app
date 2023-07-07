import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('an event element is present in the app', () => {

        });

        when('the user views the event list', () => {

        });

        then('the event element should be in a collapsed state by default', () => {

        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        given('an event element in a collapsed state', () => {

        });

        when('the user clicks on the event element', () => {

        });

        then('the event details should be displayed, showing more information about the event', () => {

        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then, and }) => {
        given('an expanded event element', () => {

        });

        when('the user clicks on the event element', () => {

        });

        then('the event details should be hidden, collapsing the event element', () => {

        });

        and('showing less information about the event', () => {

        });
    });
});
