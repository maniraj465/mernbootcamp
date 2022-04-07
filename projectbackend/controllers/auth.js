const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const User = require('./../models/user');
const { validationResult } = require('express-validator')

exports.signUp = (req, res) => {
    console.log('Signup works!');
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            parameter: errors.array()[0].param,
        });
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                status: 400,
                message: "Not able to save user in database"
            });
        }
        res.json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    });
};


exports.signIn = (req, res) => {
    console.log('Signin works!');
    const { email, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            parameter: errors.array()[0].param,
        });
    }
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User's email dosen't match!",
            });
        }
        if (!user.authendicate(password)) {
            return res.status(401).json({
                error: "Email and password don't match!"
            });
        }

        // create token
        const token = jwt.sign({id: user._id}, process.env.SECRET);

        // put token in cookie
        res.cookie("token", { expire: new Date() + 9999});

        // send response to front end
        const {_id, name, email, role } = user;
        return res.json(
            { 
                token, 
                user: {
                    _id,
                    name,
                    email,
                    role,
                }
            }
        );
    });
};

exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: 'User signout successfully!'
    });
};

// protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    // algorithms: ['RS256'],
    userProperty: "auth"
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
    const checker = req.profile && req.auth && req.profile._id === req.auth._id;
    if (!checker) {
        return res.statud(403).json({
            error: 'ACCESS DENIED'
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.statud(403).json({
            error: 'You are not an admin.'
        });
    }
    next();
}