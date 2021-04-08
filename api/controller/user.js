const UserModel = require('../models/user');
const redis = require("redis");
const obj = {
    host: '192.168.29.129'
}
const client = redis.createClient();

const User = {
    registerUser: (req, res) => {
        let { name, age, occupation, email } = req.body
        let query = {
            name: name,
            age: age,
            occupation: occupation,
            email: email
        }
        let User = new UserModel(query)
        User.save(query)
            .then((result) => {
                if (result) {
                    res.send({
                        success: true,
                        msg: 'data added successfully!!'
                    })
                } else {
                    throw new Error('something went wrong');
                }
            })
            .catch(() => {
                res.send({
                    succes: false,
                    msg: 'something went wrong'
                })
            })
    },
    getUserInfo: (req, res) => {
        client.get("email", function (err, reply) {
            if (err) {
                throw new Error(err)
            } else {
                let userData = JSON.parse(reply)
                if (userData && userData.email == req.query.email) {
                    res.send({
                        success: true,
                        data: userData
                    });
                } else {
                    let query = {
                        email: req.query.email
                    }
                    UserModel.findOne(query, { __v: 0 })
                        .then((result) => {
                            if (result) {
                                client.set("email", JSON.stringify(result), () => {
                                    res.send({
                                        success: true,
                                        msg: result
                                    })
                                });
                            } else {
                                throw new Error('no user found');
                            }
                        })
                        .catch(() => {
                            res.send({
                                succes: false,
                                msg: 'no user found'
                            })
                        })
                }
            }
        });
    }
};

module.exports = User;