const express = require('express');
const { signOut, signUp } = require('./../controllers/auth');
const router = express.Router();


router.get('/signout', signOut);

router.post('/signup', signUp);

module.exports = router;