
var express = require('express'),
app = express(),
port = process.env.PORT || 8080;

const cors = require('cors');

app.use(cors({
credentials: true,
origin: 'https://fastparkpwa.herokuapp.com/' // URL of the react (Frontend) app
}));

app.get('/', (req, res) => {
res.send('¡Bienvenido a la aplicación Socket.IO de los sensores FastPark!');
});

var server = app.listen(port, () => {
console.log('Server started on: ' + port);
});

// attach socket to the node server
var io = require('socket.io').listen(server);
require('./socket')(io);