# hackathon
Justice League Hackathon

# Using the ctwebhook webhook using firebase functions
Save the webhook on the CleverTap dashboard.
Add the name of the webhook 
Put the HTTP Method as POST
Add the destination URL : https://us-central1-jl-hackathon.cloudfunctions.net/ctwebhookendpoint
Add Header parameters as :
		X-CleverTap-Account-Id
		X-CleverTap-Passcode
		Content-Type : application/json

# How the code works?
We have a custom webhook that will be wrapper for any event/user upload from customer side
The wrapper will be working as :

Use the profile variables and custom body option in the webhook campaign.
When condition is Event Upload :

	type = event
	check where there is evtName, evtData.<propertyname>, timestamp, region name
When confition is User Upload :
	
	type = profile
	check where there is a timestamp, profileData.<propertyname>
