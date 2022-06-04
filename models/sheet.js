const mongoose = require('mongoose');
const { Schema } = mongoose;
const { format } = require('date-fns');

const sheetSchema = new Schema({
  URL: { type: String, required: true },
  Date: {
    type: String,
    required: true,
    default: format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss"),
  },
  Name: { type: String, required: true },
});

//create model of customer
const Sheet = mongoose.model('Sheet', sheetSchema);

module.exports = Sheet;
