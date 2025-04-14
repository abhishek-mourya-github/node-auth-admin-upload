// import express to use its functionalities to build the routes
const express = require('express');
// to keep the routes file clean we have created another folder names controller contains all the logics part
const {registerUser, loginUser, changePassword} =  require('../controllers/auth-controller');
// used to avoid app.get() and keep the code more organized
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware')

// All routes are related to authentication & authorization
router.post('/register',registerUser);
router.post('/login', loginUser);
router.post('/change-password',authMiddleware, changePassword);

// to make sure this files avaialable for other files aslo
module.exports = router;