const express = require('express');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public
router.post('/register', async (req, res) => {
  const {name, password, email, role,
    gender, dateOfBirth, placeOfBirth,
     timeofBirth, phoneNumber } = req.body;
  try{
  if (!name || !password || !email || !role ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await User.findOne({ name });
  if (existingUser) {
    return res.status(401).json({ message: 'Username already exists' });
  }

//   const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, password, email, role, gender, dateOfBirth, placeOfBirth, timeofBirth, phoneNumber });
  await user.save();

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.status(201).json({ token });
}catch(e){
    res
    .status(500)
    .json({ message: "An error occurred.", error: e.message, val1: false });
  console.log(e);
}
});

// @desc    Login a user
// @route   POST /auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  try{
  const user = await User.findOne({ name });
  if (!user || !(password === user.password)) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.status(200).json({ token, role: user.role });
  }catch(e){
    res
        .status(500)
        .json({ message: "An error occurred.", error: e.message, val1: false });
      console.log(e);
  }
});

module.exports = router;