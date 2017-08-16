import React from 'react';
import { Chart } from 'react-d3-core';
import { LineChart } from 'react-d3-basic';
const parseDate = require('d3').timeParse('%d.%m.%Y');

var o = {
  width: 700,
  height: 300,
  margins: {left: 100, right: 100, top: 50, bottom: 50},
  title: "User sample",
  // chart series,
  // field: is what field your data want to be selected
  // name: the name of the field that display in legend
  // color: what color is the line
  chartSeries: [{
    field: 'index',
    name: 'index',
    color: '#ff7f0e'
  }],
  x: d => d.index// your x accessor
};

export default class App extends React.Component
{
  constructor(props){
    super(props);
    this.state = {data: []};
  }
  
  componentDidMount(){
    this.props.onUpdate(el => {
      el.created = parseDate(el.created);
      
      let newData = Array.from(this.state.data);
      newData.push(el);
      
      this.setState((prevState, props) => ({data: newData}));
    });
  }
  
  render(){
    return (
      <Chart
          title= {o.title}
          width= {o.width}
          height= {o.height}
          margins= {o.margins}
      >
        <LineChart
          showXGrid= {false}
          showYGrid= {false}
          margins= {o.margins}
          title= {o.title}
          data= {this.state.data}
          width= {o.width}
          height= {o.height}
          chartSeries= {o.chartSeries}
          x={o.x}
        />
      </Chart>
    );
  }
}