var hash = require('../helper/HashHelper').hash,
    User = require('../models/user');

/*
 * Authenticate account
 */
function authenticate (name, pass, fn) {
    User.findOne({
        username: name
    }, function (err, user) {
        if (user) {
            if (err) return fn(new Error('cannot find user'));
            hash(pass, user.salt, function (err, hash) {
                if (err) return fn(err);
                if (hash == user.hash) return fn(null, user);

            })
        }
    });
}

module.exports = function (app) {
    app.get('/login', function (req, res) {
        res.render('login', { title: '登录' });
    });
    app.post('/login', function (req, res) {
        authenticate(req.body.username, req.body.password, function (err, user) {
            if (user) {
                req.session.regenerate(function () {

                    req.session.user = user;
                    req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
                    res.redirect('/');
                });
            } else {
                req.session.error = 'Authentication failed, please check your username';
            }
        });
    });

    app.get('/reg', function (req, res) {
        if (req.session.user) {
            res.redirect("/");
        } else {
            res.render('reg', { title: '注册' });
        }
    });

    app.post('/reg', function (req, res) {
        console.log(req);
        return;
        var password = req.body.password;
        var username = req.body.username;
        hash(password, function (err, salt, hash) {
            if (err) throw err;

            var user = new User({
                username: username,
                salt: salt,
                hash: hash
            }).save(function (err, newUser) {
                if (err) throw err;
                authenticate(newUser.username, password, function (err, user) {
                    if (user) {
                        req.session.regenerate(function () {
                            req.session.user = user;
                            req.session.success = 'Authenticated as ' + user.username
                                + ' click to <a href="/logout">logout</a>. '
                                + ' You may now access <a href="/restricted">/restricted</a>.';
                        })
                    }
                })
            });
        });
    });
};
