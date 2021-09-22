const { cart, validate } = require('../models/cartModel');
const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const asyncMiddleware = require("../middlewares/async");

router.get('/', auth, asyncMiddleware(async (req, res) => {
    const item = await cart.find({ userID: req.user.id });

    if (item.length == 0) {
        return res.status(400).send("Cart empty");
    }

    res.send(item);
}));

router.get('/:id', auth, asyncMiddleware(async (req, res) => {
    const item = await cart.find({ _id: req.params.id });

    if (item.length == 0) {
        return res.status(400).send("item noesnt exist in the cart");
    }

    /*if (order.userID != req.user.id) {
        return res.status(401).send("order belongs to different user");
    }*/

    res.send(item);

}));

router.post('/', auth, asyncMiddleware(async (req, res) => {
    const { error } = validate();

    if (error) {
        return res.status(400).send(error.message);
    }


    const item = new cart({
        userID: req.user.id,
        productID: req.body.productID,
        quantity: req.body.quantity
    });

    item.date = Date.now();

    const result = await item.save();

    res.send(result);
}));

router.delete('/:id', auth, asyncMiddleware(async (req, res) => {
    const item = await cart.findOne({ _id: req.params.id });
    if (item == null) {
        return res.status.send("Bad request - cannot remove item from cart")
    }

    if (item.userID != req.user.id) {
        return res.status(401).send("you cannot remove item from someone else's cart");
    }

    const result = await cart.deleteOne({ _id: req.params.id });

    res.send(result);
}));

module.exports = router;