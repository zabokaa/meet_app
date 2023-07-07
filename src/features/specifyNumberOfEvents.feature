Feature: Specify number of events

    As a user, I want to specify the number of events I want to view in the app, allowing me to adjust the quantity of events displayed in the events list.
   
    Scenario: When the user hasn't specified a number, 32 is the default number 
        Given the user hasn't specified the number of events
        When the user views the events list
        Then the default number of events displayed should be 32

    Scenario: User can change the number of events they want to see
        Given the user is viewing the events list
        When the user specifies a new number of events they want to see
        Then the events list should be updated to display the specified number of events


  

