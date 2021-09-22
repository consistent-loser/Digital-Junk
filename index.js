const express = require('express');
const winston = require('winston');
const app = express();

if (!process.env.DigitaljwtPrivateKey) {
    console.log("FATAL ERROR - DigitaljwtPrivateKey not defined");
    process.exit(1);
}

require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);



const port = process.env.PORT;
app.listen(port || 3000, () => {
    winston.log('info', `listenning to port ${port}`);
});