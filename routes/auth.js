const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/register', authController.signup);

router.post('/login', authController.login);

module.exports = router;
