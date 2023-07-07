import { loadFeature, defineFeature } from 'jest-cucumber';  //loading gherkin file - from root - and defining code f the feature

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    test('WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.', ({ given, when, then }) => {
        given('user hasn’t searched for any city', () => {

        });

        when('the user opens the app', () => {

        });

        then('the user should see a list of all upcoming events', () => {

        });
    });

    test('USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY', ({ given, when, then }) => {
        given('Given the main page is open', () => {

        });

        when('user starts typing in the city textbox', () => {

        });

        then('the user should see a list of cities (suggestions) that match what they’ve typed', () => {

        });
    });

    test('USER CAN SELECT A CITY FROM THE SUGGESTED LIST', ({ given, and, when, then }) => {
        given('the user was typing “Berlin” in the city textbox', () => {

        });

        and('the list of suggested cities is showing', () => {

        });

        when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {

        });

        then('their city should be changed to that city (e.g., “Berlin, Germany”)', () => {

        });

        and('the user should receive a list of upcoming events in that city', () => {

        });
    });
});
