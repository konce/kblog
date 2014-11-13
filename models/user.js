var mongoose = require('mongoose');

var  userSchema = new mongoose.Schema({
    account: String,
    password: String
}, {
    collection: 'user'
});

var userModel = mongoose.model('User', userSchema);

function User(user) {
    this.account = user.name;
    this.password = user.password;
}

User.get = function (config, callback) {
    userModel.find(config).sort({date: -1}).exec(function (err, user) {
        if (err) {
            return callback(err);
        }
        callback(user);
    })
};

module.exports = User;
