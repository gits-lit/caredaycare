const apiRoutes = require('./routes/api-routes.js');

// path to join files
const path = require('path');

// express server
const express = require('express');

// Initialize Express
const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "public")));

// use our apiRoutes
app.use(apiRoutes);

// listening for routes
app.listen(process.env.PORT || 3000, () => {
    console.log("App is running on port 3000!");
});