const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT;
const mongoose = require("./models")

// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('client/build'));
app.use(routes);



// Bootstrap server
const server = app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
	console.log(`Hosting on http://localhost:5000/`)
});

app.server = server;
app.mongoose = mongoose;
module.exports = app;