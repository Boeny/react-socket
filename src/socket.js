import io from 'socket.io-client';

export default function(store, port){
  const socket = io(location.protocol+'//'+location.hostname+':'+port);
  
  socket.on('state', state => {
    console.log(state);
  });
}