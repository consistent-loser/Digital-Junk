const express = require('express');
const home = require('../routes/home');
const users = require('../routes/users');
const address = require('../routes/address');
const products = require('../routes/product');
const auth = require('../routes/auth');
const orders = require('../routes/orders');
const cart = require('../routes/cart');
const wishlist = require('../routes/wishlist');
const error = require('../middlewares/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/users', users);
    app.use('/api/address', address);
    app.use('/api/products', products);
    app.use('/api/auth', auth);
    app.use('/api/orders', orders);
    app.use('/api/cart', cart);
    app.use('/api/wishlist', wishlist);
    app.use(error);
}