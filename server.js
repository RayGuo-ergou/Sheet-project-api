// testing connection
const express = require('express');
const routes = require('./routers');
const chalk = require('chalk');
const mongoose = require('mongoose');
require('dotenv').config();
const adminRouter = require('./adminRouter');

const app = express();
const PORT = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'http://localhost';
const mongooseUrl = process.env.MONGODB_URI;

//get the admin portal
app.use('/admin', adminRouter);

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

mongoose
  .connect(mongooseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(chalk.red(err));
  });
let db = mongoose.connection;

//connect to the database
db.on('error', console.error.bind(console, 'database connection error'));
db.once('open', () => {
  // we are connected
  console.log(chalk.green('connected to database'));
});

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
    chalkTheme.error(error.message),
  );

  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server start at ${hostname}:${PORT}`);
});
