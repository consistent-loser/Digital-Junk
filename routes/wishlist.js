const { wishlist, validate } = require('../models/wishlistModel');
const auth = require('../middlewares/auth');
const asyncMiddleware = require('../middlewares/async');
const express = require('express');
const router = express.Router();

router.get('/', auth, asyncMiddleware(async (req, res) => {
    const item = await wishlist.find({ userID: req.user.id });

    if (item.length == 0) {
        return res.status(400).send("wishlist empty");
    }

    res.send(item);
}));

router.get('/:id', auth, asyncMiddleware(async (req, res) => {
    const item = await wishlist.find({ _id: req.params.id });

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


    const item = new wishlist({
        userID: req.user.id,
        productID: req.body.productID,
    });


    const result = await item.save();

    res.send(result);
}));

router.delete('/:id', auth, asyncMiddleware(async (req, res) => {
    const item = await wishlist.findOne({ _id: req.params.id });
    if (item == null) {
        return res.status.send("Bad request - cannot remove item from wishlist")
    }

    if (item.userID != req.user.id) {
        return res.status(401).send("you cannot remove item from someone else's wishlist");
    }

    const result = await wishlist.deleteOne({ _id: req.params.id });

    res.send(result);
}));


module.exports = router;