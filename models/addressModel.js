const mongoose = require('mongoose');
const Joi = require('joi');

const addressSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
    },

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

    phone: {
        type: String,
        minlength: 10,
        maxlength: 10
    },

    street: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },

    house: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: true
    },

    city: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },

    pincode: {
        type: String,
        minlength: 6,
        maxlength: 6,
        required: true
    },

    state: {
        type: String,
        minlength: 3,
        maxlength: 15,
        required: true
    },

    adtype: {
        type: String,
        enum: ['Home', 'Office'],
        required: true
    }

});

const addressModel = mongoose.model('Addresses', addressSchema);

function validate(address) {
    const schema = Joi.object({
        user: Joi.string(),
        fname: Joi.string().min(5).max(100).required(),
        lname: Joi.string().min(5).max(100),
        email: Joi.string().min(5).max(100).required(),
        phone: Joi.string().min(10).max(10).required(),
        street: Joi.string().min(5).max(100).required(),
        house: Joi.string().min(1).max(100).required(),
        city: Joi.string().min(5).max(100).required(),
        pincode: Joi.string().min(6).max(6).required(),
        state: Joi.string().min(5).max(100).required(),
        adtype: Joi.string().min(4).max(100).required(),
    });

    return schema.validate(address);
}

exports.addresses = addressModel;
exports.validate = validate;