const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  emailid: {
    type: String,
    required: true
  },
  avatarurl: {
    type: String,
    required: true
  },
   followers: {
    type: Number,
    required: true
  },
  following: {
    type: Number,
    required:true
  }
});

module.exports = members = mongoose.model('members', ItemSchema);
