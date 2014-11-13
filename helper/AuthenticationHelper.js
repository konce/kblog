function authenticate(name, pass, fn) {
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
