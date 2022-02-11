// testing connection
const { google } = require('googleapis');
const keys = require('./keys.json');
const run = require('./googleSheet.js');
const express = require('express');
const routes = require('./routers');
const chalk = require('chalk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//get routes
app.use(routes);

/**
 * set chalk theme
 * use an object so we can add more if needed
 */
const chalkTheme = {
  error: chalk.underline.red.bold,
  errorTitle: chalk.black.bgRedBright,
};

// from google cloud
const client = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('connected');
    run(client);
  }
});

// Error handler middleware
// This must be placed after routes
app.use((error, req, res, next) => {
  console.log(chalkTheme.error('Error Handling Middleware called'));
  console.log(chalkTheme.errorTitle('Path: '), chalkTheme.error(req.path));
  console.log(
    chalkTheme.errorTitle('Error: '),
    chalkTheme.error(error.message)
  );
  console.log(error.stack);

  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server start at PORT ${PORT}`);
});
