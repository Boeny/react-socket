const app  = require('express')();
const http = require('http').Server(app);
const io   = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});
app.get('/index.js', (req, res) => {
  res.sendFile(__dirname + '/dist/index.js');
});

io.on('connection', (socket) => {
  socket.emit("hello", "Привет из Сокет-сервера");
});

http.listen(3000, () => {
  console.log('Сервер слушает порт 3000');
});