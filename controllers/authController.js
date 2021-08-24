const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../utils/validation');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(404).json({ error });
    }
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res.status(404).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(404).json({ error });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json({ message: 'Invalid Password' });
    }
    const token = jwt.sign(
      { _id: user._id, user: user.username },
      process.env.JWT_SECRET
    );
    res.json({
      status: 'success',
      message: 'Login successful',
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    es.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};
