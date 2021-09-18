const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
const PORT = 5000;

app.get('/', function(req, res) {
    res.send({
        name: 'maniraj'
    });
});

app.listen(PORT, () => {
    console.log(`app is running in ${PORT}`);
});



