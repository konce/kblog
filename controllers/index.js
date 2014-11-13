
/*
 * GET home page.
 */

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {title: '等一个人咖啡'})
    });
    app.get('/reg', function (req, res) {
        res.render('reg', { title: '注册' });
    });
    app.post('/reg', function (req, res) {
    });
    app.get('/post', function (req, res) {
        res.render('post', { title: '发表' });
    });
    app.post('/post', function (req, res) {
    });
    app.get('/logout', function (req, res) {
    });
    app.get('/init', function (req, res) {
        var user = new User({
            email:'kxj0206@gmail.com',
            name: 'Freewheel'
        });
        user.save();
        res.send('Data inited');
    });
};
