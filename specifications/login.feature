Feature: Logging in a user

  Users need to authenticate to register a new incident.

  Scenario: User already has an account
    Given the user's email address or username
    And the user's password
    When the user clicks the 'login' button
    Then the server checks if the user's credentials are correct
    Scenario: The user's credentials are correct
      When the server replies
      Then the user is logged in and can add incidents
    Scenario: The user's credentials are incorrect
      When the server replies
      Then the user is not logged in
      And the user is prompted to enter his credentials again

  Scenario: User doesn't already have an account
    Given the user's desired username
    And the user's desired password
    And the user's full name
    And the user's email address
    When the user clicks the 'register' button
    Then the server checks if the credentials (i.e. username and email address)
    Scenario: The new user's credentials are not already taken
      When the server replies
      Then the account is created
      And the user is prompted to log in
    Scenario: The new user's credentials are already taken
      When the server replies
      Then the account is not created
      And the user is prompted to use the already existing account or to use other credentials