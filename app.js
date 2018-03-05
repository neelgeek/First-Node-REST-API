const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const products = require('./api/routes/products');
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Acess-Control-Allow-Headers", "*");

    if (req.header === 'OPTIONS') {
        res.header("Acess-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
        return res.status(200).json({});
    }
    next();
});

app.use('/products', products);


mongoose.connect('mongodb://localhost:27017/noderest');



app.use((req, res, next) => {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message
    });

});


module.exports = app;