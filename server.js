// testing connection
const express = require('express');
const routes = require('./routers');
const chalk = require('chalk');

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

// Error handler middleware
// This must be placed after routes
app.use((error, req, res, next) => {
  console.log(chalkTheme.error('Error Handling Middleware called'));
  console.log(chalkTheme.errorTitle('Path: '), chalkTheme.error(req.path));
  console.log(
    chalkTheme.errorTitle('Error: '),
    chalkTheme.error(error.message)
  );

  res.status(error.code || 500).json({
    error: {
      status: error.code || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server start at PORT ${PORT}`);
});
