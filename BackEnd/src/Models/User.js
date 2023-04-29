const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  FirstName: {
    type: String,
    required: false,
  },
  UserID: {
    type: Number,
    required: false,
  },
  UserName: {
    type: String,
    required: false,

  },
  LastName: {
    type: String,
    required: false,
  },
  Email: {
    type: String,
    required: false,

  },
  PassportNumber: {
    type: String,
    required: false
  },

  PhoneNumber: {
    type: String,
    required: false
  },
  Password: {
    type: String,
    required: false
  },
  CountryCode: {
    type: Number,
    required: false
  },
  HomeAddress: {
    type: String,
    required: false
  },



}, { timestamps: true }, { versionKey: false });

let User
try {
  User = mongoose.model('User')
} catch (error) {
  User = mongoose.model('User', userSchema)
}
module.exports = User;