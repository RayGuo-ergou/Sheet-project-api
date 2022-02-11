const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});
router.use(morgan('combined', { stream: accessLogStream }));
router.use(morgan('tiny'));
//we are defining a new parameter called host
morgan.token('host', function (req, res) {
  return req.hostname;
});

router.get('/hello', function (req, res) {
  res.send('hello, this is the backend server');
});

//export the router
module.exports = router;
