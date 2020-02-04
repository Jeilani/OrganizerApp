# OrganizerApp
This app was created to model an easy and intuitive way to organizer one's day. I set it up to sync the Journal, "today's events", with the clicked Date. 

The backend uses a date range from the req.params to search through the MongoDB and retrieve the data. 

The best way to deploy this app locally is to npx nodemon in the main directory which will host on localhost: 3000
and to cd into the client directory and npm start the front-end created through create-react-app
