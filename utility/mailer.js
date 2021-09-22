const nodemailer = require('nodemailer');
const winston = require('winston');
module.exports = function (user) {
    const time = Date.now();
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.email,
            pass: process.env.email_password
        }
    });

    const mailoptions = {
        from: 'Prashant',
        to: user,
        subject: 'Welcome to Digital Junk',
        text: `We welcome you to digital junk, \nGo ahead sell your used accessories or buy spare parts for your devices.
        \n \n Prashant Sharma. \n Digital Junk`
    }

    transport.sendMail(mailoptions, (error, info) => {

        if (error) {
            winston.log('error', error);
        }

        else {
            winston.log('info', `${user}- email sent - ${info.response} `);
        }
    });
}
