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

app.get('/dispenseRedPill', (req, res) => {
  //add python code execution for 10 degree turn
  const spawn = require('child_process').spawn;
  const ls = spawn('python', ['./src/servo.py', '2', '10']);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

app.get('/dispenseGreenPill', (req, res) => {
  //add python code execution for 10 degree turn
  const spawn = require('child_process').spawn;
  const ls = spawn('python', ['./src/servo.py', '2', '180']);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});