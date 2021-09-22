const winston = require('winston'); // for logging errors to logfile
require('winston-mongodb'); // logging errors in the db


module.exports = function () {

    process.on('uncaughtException', (ex) => {
        winston.log('error', ex.message, ex);
        process.exit(1);
    });

    process.on('unhandledRejection', (ex) => {
        winston.log('error', ex.message, ex);
        process.exit(1);
    });

    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));  // set log file for logging
    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost/Digital-Junk',
        level: 'info'
    }));

}