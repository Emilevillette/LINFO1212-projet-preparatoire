Feature: Research an incident
	
	Scenario: User search for an incident 
		Given a small description of the incident
		When the user clicks on the 'research' button
		Then the server checks if the description matches with an entry in the database
		Scenario: The database effectively contains the description
			When the server replies
			Then website shows the incident with all it's information
		Scenario: The database doesn't contain any incident matching the description
			When the servers replies
			Then the website shows nothing
			And the user is prompted to try again
			 
