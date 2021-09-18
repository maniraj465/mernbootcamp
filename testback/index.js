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

app.listen(PORT, () => {
    console.log('Server is up and running in '+ PORT);
 });