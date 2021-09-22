const { orders, validate } = require('../models/ordersModel');
const { products, } = require('../models/productModel');
const auth = require('../middlewares/auth');
const asyncMiddleware = require('../middlewares/async');
const express = require('express');
const router = express.Router();

router.get('/', auth, asyncMiddleware(async (req, res) => {
    const user = await orders.find({ userID: req.user.id });

    if (user.length == 0) {
        return res.status(400).send("No orders yet");
    }

    res.send(user);
}));

router.get('/:id', auth, asyncMiddleware(async (req, res) => {
    const order = await orders.find({ _id: req.params.id });

    /*if (order.userID != req.user.id) {
        return res.status(401).send("order belongs to different user");
    }*/

    res.send(order);

}));

router.post('/', auth, asyncMiddleware(async (req, res) => {
    const { error } = validate();

    if (error) {
        return res.status(400).send(error.message);
    }


    const order = new orders({
        userID: req.user.id,
        productID: req.body.productID,
        addressID: req.body.addressID,
        amount: req.body.amount,
        quantity: req.body.quantity
    });

    order.date = Date.now();

    const item = await products.findOne({ _id: req.body.productID });

    if (item.inventory - req.body.quantity < 0) {
        return res.status(400).send(`only ${item.inventory} units available`);
    }

    item.inventory = item.inventory - req.body.quantity;

    await item.save();

    const result = await order.save();

    res.send(result);
}));

module.exports = router;



