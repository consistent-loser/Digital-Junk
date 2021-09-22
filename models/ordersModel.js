const mongoose = require('mongoose');
const Joi = require('Joi');


const ordersSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Types.ObjectId
    },

    userID: {
        type: mongoose.Types.ObjectId
    },

    addressID: {
        type: mongoose.Types.ObjectId
    },

    date: {
        type: Date
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    quantity: {
        type: Number,
        min: 0,
        required: true
    }
});

const ordersModel = mongoose.model('orders', ordersSchema);

function validate(order) {
    const schema = Joi.object({
        productID: Joi.string(),
        userID: Joi.string(),
        addressID: Joi.string(),
        date: Joi.date(),
        amount: Joi.number().min(0).required(),
        quantity: Joi.number().min(0).required()
    });
    return schema.validate(order);
}

exports.orders = ordersModel;
exports.validate = validate;