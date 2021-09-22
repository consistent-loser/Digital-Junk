const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },

    lname: {
        type: String,
        minlength: 5,
        maxlength: 100,
    },

    email: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },

    password: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },

    phone: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: true
    },

    isAdmin: {
        type: Boolean,
        required: true
    }
});

// hashing password
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }
    catch (err) {
        next(err);
    }
});


const userModel = mongoose.model('users', userSchema);

function validate(user) {
    const schema = Joi.object({
        fname: Joi.string().min(5).max(100).required(),
        lname: Joi.string().min(5).max(100),
        email: Joi.string().min(5).max(100).required(),
        password: Joi.string().min(5).max(100).required(),
        isAdmin: Joi.boolean().required(),
        phone: Joi.string().min(10).max(10).required()
    });

    return schema.validate(user);
}

exports.users = userModel;
exports.validate = validate;