Feature: Show/Hide event details

    As a user, I want the ability to show or hide event details, enabling me to see more or less information about an event as needed.

    Scenario: An event element is collapsed by default  
        Given an event element is present in the app 
        When the user views the event list 
        Then the event element should be in a collapsed state by default


    Scenario: User can expand an event to see its details
        Given an event element in a collapsed state
        When the user clicks on the event element
        Then the event details should be displayed, showing more information about the event

    Scenario: User can collapse an event to hide its details 
        Given an expanded event element
        When the user clicks on the event element 
        Then the event details should be hidden, collapsing the event element
        And showing less information about the event

