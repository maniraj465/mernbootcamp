const express = require('express');
const { check } = require('express-validator');
const { signOut, signUp, signIn, isSignedIn } = require('./../controllers/auth');
const router = express.Router();


router.get('/signout', signOut);

router.get('/issignedin', isSignedIn, (req, res) => {
    res.json({
        mes: "Signed user!"
    });
});

router.post('/signup', [
    check('firstName', 'First name should be at least 3 characters.')
    .isLength({ min : 3 }),
    check('email', 'Email should be a valid email address.')
    .isEmail(),
    check('password', 'Password should be at least 5 character.')
    .isLength({ min: 5 })
], signUp);

router.post('/signin', [
    check('email', 'Email should be a valid email address.')
    .isEmail(),
    check('password', 'Password should be not be empty and it should contains at least 5 character.')
    .isLength({ min: 5 })
], signIn);

module.exports = router;