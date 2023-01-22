const express = require('express');
const router = express.Router();

const userAuth = require('../middleware/auth');

const userController = require('../controllers/user');



router.post('/signup',userController.signup);
router.post('/login',userAuth,userController.login);

module.exports = router;