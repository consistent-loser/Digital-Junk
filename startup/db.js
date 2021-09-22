const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/Digital-Junk')
        .then(() => console.log("connected to database"))
        .catch(err => console.log(err));
}
