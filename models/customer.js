const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  Date: String,
  from: String,
});

//create model of customer
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
