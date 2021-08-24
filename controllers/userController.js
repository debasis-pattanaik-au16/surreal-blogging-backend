const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcryptjs');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...details } = user._doc;
    res.status(200).json({
      status: 'success',
      data: {
        user: details,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json('You can update only your account!');
  }
};

exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
          status: 'success',
          message: 'User has been deleted successfully',
        });
      } catch (err) {
        res.status(404).json({
          status: 'failed',
          message: err.message,
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: 'User not found',
      });
    }
  }
};
