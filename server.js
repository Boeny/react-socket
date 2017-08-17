const app  = require('express')();
const http = require('http').Server(app);
const io   = require('socket.io')(http);
const config = require('./src/config');
const { sendData } = require('./src/dataProvider');
const PUBLIC = __dirname + '/dist/';

app.get('/', (req, res) => {
  res.sendFile(PUBLIC + 'index.html');
});

app.get('/index.js', (req, res) => {
  res.sendFile(PUBLIC + 'index.js');
});

io.on('connection', (socket) => {
  sendData(data => {
    socket.emit('state', data);
  });
});

const port = config.port;

http.listen(port, () => {
  console.log('Server starts at port '+port);
});