var crypto = require('crypto');
var len = 128;
var iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */

exports.hash = function (pwd, salt, fn) {
    if (arguments.length === 3) {
        crypto.pbkdf2(pwd, salt, iterations, len, fn);
    } else {
        fn = salt;
        crypto.randomBytes(len, function(err, salt){
            if (err) return fn(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
                if (err) return fn(err);
                fn(null, salt, hash);
            });
        });
    }
};
