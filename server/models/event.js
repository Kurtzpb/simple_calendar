// modules
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  timeStart: {
    type: String,
    required: true,
    trim: true
  },
  timeEnd: {
    type: String,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = mongoose.model('Events', eventSchema);
