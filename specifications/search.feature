Feature: Research an incident
	
	Scenario: The user searches for an incident with text
		Given a small description of the incident
		When the user clicks on the 'research' button
		Then the server checks if the description matches with an entry in the database
		Scenario: The database effectively entries containing the description
			When the server replies
			Then website shows the incidents with all their information
		Scenario: The database doesn't contain any incident matching the description
			When the servers replies
			Then the website shows nothing

	Scenario: The user searches for an incident with a date
		Given the day that the user desires to search for
		When the user changes the date on the field on the website
		Then the server checks if an entry (or several entries) in the database corresponds to the sought-for date
		Scenario: The database has entries for that day
			When the server replies
			Then website shows the incidents with all their information
		Scenario: The database does not have entries for that day
			When the servers replies
			Then the website shows nothing
