require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

// CONSTANTS
const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const MONGO_DB_PORT = process.env.MONGO_DB_PORT;
const MONGO_DB_TABLE_NAME = process.env.MONGO_DB_TABLE_NAME;

// DB Connection
mongoose.connect(MONGO_DB_URL + MONGO_DB_PORT + MONGO_DB_TABLE_NAME, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB CONNECTED');
}).catch(() => {
    console.log('DB CONNECTION FAILED');
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.get('/', function(req, res) {
    res.send({
        name: 'maniraj'
    });
});

// Strating a server
app.listen(PORT, () => {
    console.log(`app is running in ${PORT}`);
});



