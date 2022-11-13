Feature : enter a new incident

  Users need to have an account to register a new incident

  Scenario: User already has an account
    Given a small description of the incident
    And the address where the incident took place
    When the user clicks on the 'submit' button
    Then the server adds the incident to the database

  Scenario: User doesn't have an account
    Then the server redirects the user to the account creation/login page
    When the user is logged in
    Then the user can go to the incident tab


