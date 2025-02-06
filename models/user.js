const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: {type: String, required: true,},
  dateOfBirth:{type: String, required: true,},
  placeOfBirth:{type: String, required: true,},
  timeOfBirth:{type:Date,required:true},
  phoneNumber:{type: String, required:true},
  role:{type: String, required:true}
});

module.exports = mongoose.model('User', UserSchema);