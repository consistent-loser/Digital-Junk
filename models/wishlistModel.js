const mongoose = require('mongoose');
const Joi = require('Joi');


const wishlistSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Types.ObjectId
    },

    userID: {
        type: mongoose.Types.ObjectId
    },

});

const wishlistModel = mongoose.model('wishlist', wishlistSchema);

function validate(order) {
    const schema = Joi.object({
        productID: Joi.string(),
        userID: Joi.string()
    });
    return schema.validate(order);
}

exports.wishlist = wishlistModel;
exports.validate = validate;