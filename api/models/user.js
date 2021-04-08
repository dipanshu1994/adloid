const mongoose = require('mongoose');

const userScheema = mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    occupation: {
        type: String
    },
    email: {
        type: String
    }
});

module.exports = mongoose.model('user',userScheema);