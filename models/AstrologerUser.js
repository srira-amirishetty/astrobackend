const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AstrologerSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: {type: String, required: true,},
  dateOfBirth:{type: String, required: true,},
  experience:{type:Number,required:true},
  phoneNumber:{type: String, required:true},
  role:{type: String, required:true}
});

module.exports = mongoose.model('Astrologer', AstrologerSchema);

