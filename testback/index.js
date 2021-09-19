const express = require('express');

const app = express();

const PORT = 8000;

app.get('/', (req, res) => {
    return res.send({
        name: 'maniraj',
        role: 'reveloper'
    });
});

app.get('/login', (req, res) => {
    return res.send({
        name: 'maniraj',
        role: 'reveloper'
    });
});


app.get('/signout', (req, res) => {
    return res.send({
        route: '/signout'
    });
});

const admin = (req, res) => {
    return res.send('admin dashboard');
};

const isAdmin = (req, res, next) => {
    console.log('isAdmin running');
    next();
};

const isLoggedIn = (req, res, next) => {
    console.log('isLoggedIn running');
    next();
};

app.get('/admin', isLoggedIn, isAdmin, admin);

app.listen(PORT, () => {
    console.log('Server is up and running in '+ PORT);
 });