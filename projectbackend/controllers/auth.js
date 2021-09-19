const User = require('./../models/user');

exports.signOut = (req, res) => {
    res.json({
        message: 'User signout'
    });
};

exports.signUp = (req, res) => {
    console.log('Signup works!');
    console.log(req.body);
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
