const express = require('express');
const { check } = require('express-validator')
const { signOut, signUp } = require('./../controllers/auth');
const router = express.Router();


router.get('/signout', signOut);

router.post('/signup', [
    check('firstName', 'First name should be at least 3 characters.')
    .isLength({ min : 3 }),
    check('email', 'Email should be a valid email address.')
    .isEmail(),
    check('password', 'Password should be at least 5 character.')
    .isLength({ min: 5 })
], signUp);

module.exports = router;