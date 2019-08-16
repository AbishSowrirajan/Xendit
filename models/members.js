const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    _id: {
    type: String,
    required: true
  },
  org: {
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

//const connection2 = mongoose.createConnection('mongodb://mongo-comment:27017/Member');


//module.exports = members = connection2.model('members', ItemSchema);
module.exports = members = mongoose.model('members', ItemSchema);
