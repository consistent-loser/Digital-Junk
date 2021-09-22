const express = require('express');
const { users, validate } = require('../models/userModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const asyncMiddleware = require('../middlewares/async');
const mailer = require('../utility/mailer');
// get all registered users

router.get('/', asyncMiddleware(async (req, res) => {
    const result = await users.find();

    if (result.length == 0) {
        return res.status(400).send("No user registered");
    }
    res.send(result);
}));

// create a user

router.post('/', asyncMiddleware(async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }

    const details = await users.findOne({ email: req.body.email });

    if (details != null) {
        return res.status(400).send("User with this email already exists");
    }

    const tempUser = new users({
        fname: req.body.fname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });

    if (req.body.lname) {
        tempUser.lname = req.body.lname;
    }

    const result = await tempUser.save();
    const token = jwt.sign({ id: result._id, email: result.email, isAdmin: result.isAdmin }, process.env.DigitaljwtPrivateKey);
    mailer(result.email);
    res.header('x-auth-token', token).send(result);

}));

// get one user

router.get('/:id', asyncMiddleware(async (req, res) => {
    const result = await users.find({ _id: req.params.id });

    if (result.length == 0) {
        return res.status(404).send("User doesnt exist");
    }

    res.send(result);
}));

// update user detail

router.put('/:id', auth, asyncMiddleware(async (req, res) => {
    const user = await users.findOne({ _id: req.params.id });

    if (user.length == 0) {
        return res.status(400).send("Bad Request");
    }

    if (req.body.fname) {
        user.fname = req.body.fname;
    }
    if (req.body.lname) {
        user.lname = req.body.lname;
    }
    if (req.body.password) {
        user.password = req.body.password;
    }
    if (req.body.phone) {
        user.phone = req.body.phone;
    }

    const result = await user.save();
    res.send(result);
}));

//delete user account

router.delete('/:id', auth, asyncMiddleware(async (req, res) => {
    const result = await users.findByIdAndDelete(req.params.id);

    res.send(result);
}));
module.exports = router;
