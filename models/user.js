var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email   : {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('User', userSchema);