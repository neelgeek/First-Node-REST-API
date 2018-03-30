const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});



router.post('/', (req, res, next) => {

    prodname = req.body.name;
    prodprice = req.body.price;


    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: prodname,
        price: prodprice
    });
    product.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: "Product added!"
        });
    }).catch(err => {
        console.log(err);
    });


});


router.get('/:prod_id', (req, res, next) => {
    id = req.params.prod_id;

    Product.findById(id)
        .exec().then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {

            res.status(500).json({ error: err });

        });

});

router.delete('/:prod_id', (req, res, next) => {
    prod = req.params.prod_id;
    res.status(200).json({
        message: 'product deleted with id ' + prod
    });
});

module.exports = router;