const express = require('express');
const { users, } = require('../models/userModel');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const asyncMiddleware = require('../middlewares/async');

router.post('/', asyncMiddleware(async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error);
    }

    const user = await users.findOne({ email: req.body.email });

    if (user == null) {
        return res.status(400).send("Invalid username or password");
    }

    const genuine = await bcrypt.compare(req.body.password, user.password);

    if (!genuine) {
        return res.status(400).send("Invalid username or password");
    }

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.DigitaljwtPrivateKey);

    res.send(token);

}));

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).required(),
        password: Joi.string().min(5).max(100).required()
    });

    return schema.validate(user);
}

module.exports = router;