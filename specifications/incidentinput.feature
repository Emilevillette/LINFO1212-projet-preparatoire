Feature : enter a new incident

  User need to have an account to register a new incident

  Scenario: User already has an account
    Given a small description of the incident
    And the address where the incident took place
    When the user clicks on the 'submit' button
    Then the server checks if neither of the 2 boxes are empty
    And the server adds the incident to the database

  Scenario: User doesn't have any account
    Then the server returns the user to the account creation page
    When the user is logged
    Then the user can go to the incident tab

