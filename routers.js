const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
require('dotenv').config();

const checkAccess = require('./controllers/checkAccess');
const getAllSheets = require('./controllers/getAllSheets');
const writeIntoSheet = require('./controllers/writeIntoSheet');

const urlModel = require('./models/sheet');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});
router.use(morgan('combined', { stream: accessLogStream }));
router.use(morgan('tiny'));
//we are defining a new parameter called host
morgan.token('host', function (req, res) {
  return req.hostname;
});

// from google cloud
const client = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets'],
);

client.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('connected');
  }
});

router.get('/hello', function (req, res) {
  res.send('hello, this is the backend server');
});

// router to check if we have access to google sheet
router.get('/checkAccess', (req, res, next) => {
  checkAccess(client, req, res, next);
});

// router to get all sheet title
router.get('/sheets', (req, res, next) => {
  getAllSheets(client, req, res, next);
});

// router to use submit page
router.get('/submit', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'submit.html'));
});

// router to update sheet
router.post('/updateSheet', (req, res, next) => {
  writeIntoSheet(client, req, res, next);
});

// router to get all sheets accessed before
router.get('/urls', async (req, res, next) => {
  await urlModel
    .find({})
    .then((urls) => {
      res.json(urls);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

//export the router
module.exports = router;
