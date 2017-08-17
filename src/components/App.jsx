import React from 'react';
import { AreaChart, CartesianGrid, Area, Tooltip, XAxis, YAxis } from 'recharts';
import { List } from 'immutable';

export default class App extends React.Component
{
  constructor(props){
    super(props);
    this.data = [];
    this.state = {data: List()};
  }
  
  componentDidMount(){
    this.props.onUpdate(el => {
      let newData = this.state.data.push(el);
      this.data = newData.toArray();
      if (this.data.length > 50) newData = newData.shift();
      this.setState((prevState, props) => ({data: newData}));
    });
  }
  
  render(){
    return (
      <AreaChart width={730} height={250} data={this.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="created" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    );
  }
}