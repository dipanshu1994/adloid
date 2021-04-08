const UserController = require('../controller/user');


const User = {
    registerUser: function (req, res) {
        UserController.registerUser(req, res)
    },
    getUserInfo: function (req, res) {
        UserController.getUserInfo(req, res)
    },
};

module.exports = User;