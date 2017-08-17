import React from 'react';
import { AreaChart, CartesianGrid, Area, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { List } from 'immutable';

const MAX_WIDTH = 70;

export default class App extends React.Component
{
  constructor(props){
    super(props);
    this.data = [];
    this.state = {data: List()};
    this.projects = {};
    this.names = [];
  }
  
  addProject (el) {
    let name = el.project_name;
    let exists = this.projects[name];
    
    this.setOldValues(el);
    el[name] = el.amount;
    
    if (exists){// существует - новая цена текущему проекту
      exists[name] = el.amount;
    }
    else{// иначе добавляем
      this.projects[name] = Object.assign({}, el);
      this.names.push(name);
    }
  }
  
  map (callback) {
    let result = [];
    
    for (let i = 0; i < this.names.length; i++){
      let name = this.names[i];
      let tmp = callback(this.projects[name], name);
      
      if (tmp === false ) break;
      if (tmp) result.push(tmp);
    }
    
    return result;
  }
  
  setOldValues (el) {
    this.map((p, name) => {
      el[name] = p.amount;
    });
  }
  
  componentDidMount(){
    this.props.onUpdate(el => {
      this.addProject(el);
      
      let newData = this.state.data.push(el);
      this.data = newData.toArray();
      
      if (this.data.length > MAX_WIDTH) newData = newData.shift();
      this.setState((prevState, props) => ({data: newData}));
    });
  }
  
  render(){
    return (
      <AreaChart width={730} height={250} data={this.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
        {
          this.map((p, name) => {
            return (
              <linearGradient key={name} id={'color'+name} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={p.color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={p.color} stopOpacity={0}/>
              </linearGradient>
            )
          })
        }
        </defs>
        
        <XAxis dataKey="created" />
        <YAxis />
        
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip isAnimationActiveBoolean={false} active={true}/>
        <Legend verticalAlign="top"/>
        
        {
          this.map((p, name) => {
            return <Area type="monotone" key={name} dataKey={name} stroke={p.color} fillOpacity={1} fill={'url(#color'+name+')'} />
          })
        }
      </AreaChart>
    );
  }
}