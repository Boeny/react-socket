const random = (min, max, round) => {
  let result = (max - min) * Math.random() + min;
  return round ? Math.round(result) : result;
};
const config = require('./config');

function getData(){
  let date = new Date();
  const projects = config.projects;
  let project = projects[ random(0, projects.length-1, true) ];
  
  return {
    theme_id : random(1,10,true),
    user_id : random(1,10,true),
    project_name : project.name,
    color : project.color,
    amount : random(8,133,true),
    user_country: 'Russia',
    user_gender: config.genders[random(0,1,true)],
    user_age: random(18, 45, true),
    created : [date.getHours(),date.getMinutes(),date.getSeconds()].join(':')
  };
}

function sendData(callback){
  setInterval(() => callback(getData()), config.timeout);
}

exports.default = function (callback){
  if (global.io) {
    io().on('state', callback);
  }
  else{
    sendData(callback);
  }
};
exports.getData = getData;
exports.sendData = sendData;
