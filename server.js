const app  = require('express')();
const http = require('http').Server(app);
const io   = require('socket.io')(http);
const config = require('./config');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/index.js', (req, res) => {
  res.sendFile(__dirname + '/dist/index.js');
});

const projects = config.projects;
const random = (min, max, round) => {
  let result = (max - min) * Math.random() + min;
  return round ? Math.round(result) : result;
};

io.on('connection', (socket) => {
  var index = 0;
  
  setInterval(() => {
    let date = new Date();
    
    socket.emit('state', {
      index: index,
      
      theme_id : random(1,10,true), 
      user_id : random(1,10,true), 
      project_name : projects[random(1,10,true)],
      amount : random(1,200,true),
      user_country: 'Russia',
      user_gender: ['m','f'][random(0,1,true)],
      user_age: random(18, 45, true),
      created : [date.getDay(),date.getMonth(),date.getFullYear()].join('.')
    });
    
    index++;
  }, 100);
});

const port = config.port;

http.listen(port, () => {
  console.log('Server starts at port '+port);
});