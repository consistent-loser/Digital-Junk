const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    },

    price: {
        type: Number,
        min: 0,
        required: true
    },

    description: {
        type: String,
        minlength: 10,
        required: true
    },

    category: {
        type: String,
        minlength: 3,
        required: true,
        enum: ['cat1', 'cat2', 'cat3']
    },

    inventory: {
        type: Number,
        min: 0,
        required: true
    }
});

const productModel = mongoose.model('Products', productSchema);

function validate(product) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().min(0).required(),
        description: Joi.string().min(10).required(),
        category: Joi.string().min(3).required(),
        inventory: Joi.number().min(0).required()
    });

    return schema.validate(product);
}

exports.products = productModel;
exports.validate = validate;