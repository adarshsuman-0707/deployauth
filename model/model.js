const mongoose = require('mongoose');

const stru = mongoose.Schema({
  username: String,
  number: Number,
  email: String,
  password: String
})
let table = mongoose.model("users", stru)
module.exports = table;