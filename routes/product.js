const express = require('express');
const { products, validate } = require('../models/productModel');
const auth = require('../middlewares/auth');
const asyncMiddleware = require('../middlewares/async');
const validateAdmin = require('../utility/checkAdmin');
const router = express.Router();

router.post('/', auth, asyncMiddleware(async (req, res) => {

    validateAdmin(req.user, res);

    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }


    const product = new products({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        inventory: req.body.inventory
    });

    const result = await product.save();

    res.send(result);
}));

router.get('/', asyncMiddleware(async (req, res) => {
    const result = await products.find();

    if (result.length == 0) {
        return res.status(400).send("No Product found");
    }

    res.send(result);
}));

// search by category 
router.get('/categories/:category', asyncMiddleware(async (req, res) => {
    const result = await products.find({ category: req.params.category });

    if (result.length == 0) {
        return res.status(400).send("No product found");
    }

    return res.send(result);
}));

// search by name
router.get('/search/:query', asyncMiddleware(async (req, res) => {
    const keyword = req.params.query.split(" ");
    const result = await products.find({ name: /.*keyword[0].*/ });


}));

router.get('/:id', asyncMiddleware(async (req, res) => {
    const result = await products.find({ _id: req.params.id });

    if (result.length == 0) {
        return res.status(404).send("Product not found");
    }

    res.send(result);
}));

router.delete('/:id', auth, asyncMiddleware(async (req, res) => {

    validateAdmin(req.user, res);

    const result = await products.findByIdAndDelete(req.params.id);
    res.send(result);
}));

router.put('/:id', auth, asyncMiddleware(async (req, res) => {


    validateAdmin(req.user, res);

    const result = await products.find({ _id: req.params.id });
    if (result.length == 0) {
        return res.status(400).send("Bad request");
    }

    if (req.body.name) {
        result.name = req.body.name;
    }

    if (req.body.price) {
        result.price = req.body.price;
    }
    if (req.body.description) {
        result.description = req.body.description;
    }
    if (req.body.inventory) {
        result.inventory = req.body.inventory;
    }
    if (req.body.category) {
        result.category = req.body.category;
    }
}));

module.exports = router;