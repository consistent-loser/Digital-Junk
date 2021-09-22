const express = require('express');
const { addresses, validate } = require('../models/addressModel');
const auth = require('../middlewares/auth');
const validateUser = require('../utility/validateUser');
const asyncMiddleware = require('../middlewares/async');
const router = express.Router();

router.get('/', auth, asyncMiddleware(async (req, res) => {
    const result = await addresses.find({ user: req.user.id });

    if (result.length == 0) {
        return res.status(404).send("No saved Addresses");
    }

    res.send(result);
}));

router.get('/:id', auth, asyncMiddleware(async (req, res) => {
    const result = await addresses.find({ _id: req.params.id });

    if (result.length == 0) {
        return res.status(404).send("Address doesn't exist");
    }
    res.send(result);
}));

router.post('/', auth, asyncMiddleware(async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }

    const address = new addresses({
        fname: req.body.fname,
        email: req.body.email,
        phone: req.body.phone,
        street: req.body.street,
        house: req.body.house,
        city: req.body.city,
        pincode: req.body.pincode,
        state: req.body.state,
        adtype: req.body.adtype
    });

    address.user = req.user.id;

    if (req.body.lname) {
        address.lname = req.body.lname;
    }



    const result = await address.save();
    res.send(result);

}));

router.put('/:id', auth, asyncMiddleware(async (req, res) => {

    const address = await addresses.findOne({ _id: req.params.id });

    if (address == null) {
        return res.status(400).send("Something went wrong")
    }

    validateUser(req.user.id, address.user, res);


    if (req.body.fname) {
        address.fname = req.body.fname;
    }
    if (req.body.lname) {
        address.lname = req.body.lname;
    }
    if (req.body.email) {
        address.email = req.body.email;
    }
    if (req.body.phone) {
        address.phone = req.body.phone;
    }
    if (req.body.street) {
        address.street = req.body.street;
    }
    if (req.body.house) {
        address.house = req.body.house;
    }
    if (req.body.city) {
        address.city = req.body.city;
    }
    if (req.body.pincode) {
        address.pincode = req.body.pincode;
    }
    if (req.body.state) {
        address.state = req.body.state;
    }
    if (req.body.adype) {
        address.adtype = req.body.adtype;
    }

    result = await address.save();
    res.send(result);
}));

router.delete('/:id', auth, asyncMiddleware(async (req, res) => {

    const address = await addresses.findOne({ _id: req.params.id });

    if (address == null) {
        return res.status(400).send("Something went wrong")
    }
    validateUser(req.user.id, address.user, res);

    const result = await addresses.findByIdAndDelete(req.params.id);

    res.send(result);
}));

module.exports = router;