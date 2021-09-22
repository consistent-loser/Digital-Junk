const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).send("access denied no token provided");
    }
    try {
        const decoded = jwt.verify(token, process.env.DigitaljwtPrivateKey);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(400).send("Bad request - Invalid Auth Token");
    }

}

module.exports = auth;