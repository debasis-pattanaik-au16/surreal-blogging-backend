const router = require('express').Router();
const Category = require('../models/category');

router.post('/', async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json({
      status: 'success',
      data: {
        savedCategory,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      status: 'success',
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
});

module.exports = router;
