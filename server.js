var spawn = require('child_process').spawn;

var child  = spawn('supervisor', ['app.js']);
child.on('data', function (err, data) {
    console.log(data);
});
