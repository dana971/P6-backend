const express = require('express');
const router = express.Router();

/**
 * Import des fonctions login/Signup
 * @type {{signup?: function(*, *, *): void, login?: function(*, *, *): void}}
 */
const userController = require('../controllers/user');


//Routes d'authentification du User
router.post('/signup',  userController.signup);
router.post('/login', userController.login);

module.exports = router;