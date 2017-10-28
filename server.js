var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var escape_html = require('escape-html');

var server = http.createServer();
var io = socketio(server);
var port = 3000;

fs.readFile('index.html',function (err,html_string) {
    if (err)
    {
        throw err;
    }
    io.on('connection',function (socket) {
        socket.on('message',function (data) {
            console.log('Server, data: ', data);
            if (data && typeof data.nickname == 'string' && typeof data.message == 'string' && data.nickname && data.message)
            socket.broadcast.emit('message', {nickname: data.nickname, message: data.message});
        })
    });
    server.on('request',function (request,response) {
        response.writeHeader(200,{'Content-Type' : 'text/html'});
        response.end(html_string);
    });
    server.listen(port,function () {
        console.log('Server running at port ' + port);
    })
});