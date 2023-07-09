Feature: Filter events by city

    # As a user, I want to filter events by city, allowing me to view a list of events specific to that city.
    Scenario: WHEN USER HAS NOT SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES
        Given user has not searched for any city
        When the user opens the app
        Then the user should see a list of all upcoming events


    Scenario: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY
        Given the main page is open
        When user starts typing in the city textbox
        Then the user should see a list of cities that match what they have typed


    Scenario: USER CAN SELECT A CITY FROM THE SUGGESTED LIST
        Given the user was typing “Berlin” in the city textbox
        And the list of suggested cities is showing
        When the user selects a city  from the list
        Then their city should be changed to that city 
        And the user should receive a list of upcoming events in that city