const express = require('express');
const router = express.Router();
const User = require('../service/user'); 

router.post('/register-user', User.registerUser);
router.get('/get-user-info', User.getUserInfo);


module.exports = router;
