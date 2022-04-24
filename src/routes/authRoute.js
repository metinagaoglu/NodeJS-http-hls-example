const express = require('express');
const router = express.Router();

const validationMiddleware = require('../middleware/validationMiddleware');
const authController = require('../controller/authController');

const authRequest = require('../validation/authRequest');

router.post('/register', validationMiddleware(authRequest.registerSchema), authController.register);
router.post('/login', validationMiddleware(authRequest.loginSchema), authController.login);

module.exports = router;