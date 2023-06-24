# :purple_circle: *MEET App* :purple_circle:

## table of contents
* [objective](#objective)
* [key features](#key-features)
* [user stories](#user-stories)
* [project status](#project-status)
* [link to page](#link-to-page)
* [acknowledgements](#acknowledgements)

## objective
- to build a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique
- app uses the Google Calendar API to fetch upcoming events

## key features
- filter events by city
- show/hide event details
- specify number of events
- using app when offline
- app shortcut to home screen
- view a chart showing the number of upcoming events by city

## user stories 
-  As a user, I want to filter events by city, allowing me to view a list of events specific to that city.
    - SCENARIO 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.
      Given user hasn’t searched for any city
      When the user opens the app
      Then the user should see a list of all upcoming events
    - SCENARIO 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.
      Given the main page is open
      When user starts typing in the city textbox
      Then the user should see a list of cities (suggestions) that match what they’ve typed
    - SCENARIO 3: SCENARIO 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.
      Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
      When the user selects a city (e.g., “Berlin, Germany”) from the list
      Then their city should be changed to that city (e.g., “Berlin, Germany”) and the user should receive a list of upcoming events in that city
      
- As a user, I want the ability to show or hide event details, enabling me to see more or less information about an event as needed.
    - SCENARIO 1: An event element is collapsed by default
      Given an event element is present in the app
      When the user views the event list
      Then the event element should be in a collapsed state by default
    - SCENARIO 2: User can expand an event to see its details
      Given an event element in a collapsed state
      When the user clicks on the event element
      Then the event details should be displayed, showing more information about the event
    - SCENARIO 3: User can collapse an event to hide its details
      Given an expanded event element
      When the user clicks on the event element
      Then the event details should be hidden, collapsing the event element and showing less information about the event
    
- As a user, I want to specify the number of events I want to view in the app, allowing me to adjust the quantity of events displayed in the events list.
    - SCENARIO 1: When the user hasn't specified a number, 32 is the default number
      Given the user hasn't specified the number of events
      When the user views the events list
      Then the default number of events displayed should be 32
    - SCENARIO 2: User can change the number of events they want to see
      Given the user is viewing the events list
      When the user specifies a new number of events they want to see
      Then the events list should be updated to display the specified number of events
    
- As a user, I want to be able to use the app offline, ensuring that I can still access the events I viewed during my last online session.
    - SCENARIO 1: Show cached data when there's no internet connection
      Given the user has previously viewed events and the data is cached
      When there is no internet connection available
      Then the app should display the cached event data to the user
    - SCENARIO 2: Show error when user changes the settings (city, time range)
      Given the user is using the app with an internet connection
      When the user tries to change the settings such as city or time range and there is no internet connection available
      Then the app should display an error message indicating that the settings cannot be changed without an internet connection

- As a user, I want to add a shortcut to the app on my home screen, enabling me to quickly open the app without searching for it.

- As a user, I want to view a chart that displays upcoming events in each city, providing me with an overview of events organized in different cities.
    - SCENARIO 1: Show a chart with the number of upcoming events in each city
      Given the user is accessing the events section of the app
      When the user selects the option to view the chart
      Then the app should display a chart
      And the chart should represent the number of upcoming events for each city

## project status
- project is: _in progress

## link to page
- https://zabokaa.github.io/meet_app/

## acknowledgements
this project was based on full-stack immersion course @ CareerFoundry
