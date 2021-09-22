const express = require('express');
const asyncMiddleware = require('../middlewares/async');
const router = express.Router();

router.get('/', asyncMiddleware(async (req, res) => {
    res.send("Welcome to Digital Junk");
}));

module.exports = router;