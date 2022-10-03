Feature: Research an incident
	
	Scenario: User search for an incident 
		Given a small description of the incident
		When the user click on the 'research' button
		Then the server checks if the description matches with one in the database
		Scenario: The database contains effectively the description
			When the server replies 
			Then website shows the incident with all the informations pairing with 
		Scenario: The database doesn't contains the description
			When the servers replies
			Then website shows nothing
			And the user is prompted to enter description again
			 
