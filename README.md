# CISE Semester 1 2020 Team 7 Team Tui SEER Project (Assignment 1B)

* MongoDB
* Express
* React (Next.js) Frontend
* Node.js Backend

Project developed by Michael Jeffcoat, Sam Ward and Tristam Archer

## Readme

1) Open the folder "seer-project" in VisualStudioCode
2) Create a file called .env
3) Populate this file with the entries located on our Trello board 
```
PORT=5000 
MONGODB_URI=""
```
4) Open a terminal windows through VSC in the seer-project root folder (ie. D:\GitHub\seer-project\)
5) Type the following command to start the Node backend (utilising Nodemon)
```
npm install
npm run dev
```
6) The folowing output will be displayed
```
> backend@1.0.0 dev D:\GitHub\seer-project
> nodemon server.js

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
(node:6344) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
Server listening on port 5000.
Hosting on: http://localhost:5000/
(node:6344) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Established Mongoose Default Connection
```
7)  Right click on Client in the VSC explorer window and click "Open in Terminal"
8) In the newly created terminal instance, type the following command to start the React Frontend
```
npm install
npm start
```
9) A internet browser window will pop up, directing you to localhost:3000 and the terminal will display any warnings it has found
10) If everything is working correctly, the Home page should render, with displays a welcome message and an array of articles and Authors. These articles and Authors are found on the Database, which is being accessed and controlled by the Node Backend started during step 5)
11) Start Experimenting, change things, see what happens. Try and learn how React works asynchronously and the quirks of the render method :) 
