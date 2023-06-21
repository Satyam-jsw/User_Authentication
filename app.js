const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const colors = require('colors');


const app = express();

dotenv.config({ path: '.env' });
require('./db/conn');

const User = require('./model/userSchema');

app.use(express.json());

// we link the router files to make our route easy

app.use(require('./router/auth'));

const PORT = process.env.PORT;


// Middelware 
// const middleware = (req, res, next) => {
//     console.log(`Hello my Middleware`);
//     next();
// }

// app.get('/', (req, res) => {
//     res.send(`Hello world from the server app.js`);
// });

// app.get('/about', middleware, (req, res) => {
//     console.log(`Hello my About`);
//     res.send(`Hello About world from the server`);
// });

// app.get('/contact', (req, res) => {
//     res.cookie("TEST", 'thapa');
//     res.send(`Hello Contact world from the server`);
// });

// app.get('/login', (req, res) => {
//     res.send(`Hello Login world from the server`);
// });


// app.get('/register', (req, res) => {
//     res.send(`Hello Registration world from the server`);
// });



app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});

