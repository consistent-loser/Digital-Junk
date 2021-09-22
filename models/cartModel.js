const mongoose = require('mongoose');
const Joi = require('Joi');


const cartSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Types.ObjectId
    },

    userID: {
        type: mongoose.Types.ObjectId
    },

    date: {
        type: Date
    },

    quantity: {
        type: Number,
        min: 0,
        required: true
    }

});

const cartModel = mongoose.model('cart', cartSchema);

function validate(product) {
    const schema = Joi.object({
        productID: Joi.string(),
        userID: Joi.string(),
        date: Joi.date(),
        quantity: Joi.number().min(0).required()
    });
    return schema.validate(product);
}

exports.cart = cartModel;
exports.validate = validate;