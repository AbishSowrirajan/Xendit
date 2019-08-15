const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  org: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('comments', ItemSchema);
