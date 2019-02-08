import React, { Component } from 'react';



import logo from './logo.svg';
import './App.css';

import Calendar from './components/Calendar'
import Tasks from './components/Tasks'

interface IState{
  day: Date,
  visibleTasks: boolean
}

class App extends Component {
  state: IState = {
    day: new Date(Date.now()),
    visibleTasks: false
  }
  updateTasks = (day: Date, visible:boolean) =>{
      console.log(day, visible);
      this.setState({
        day: day,
        visibleTasks: visible
        });
  }

  render() {
    console.log("state are",this.state);
    return (
      <div className="App">
        <Calendar updateTasks = {this.updateTasks}/>
        <Tasks
        day = {this.state.day}
        visible = {this.state.visibleTasks}
        />

      </div>
    );
  }
}

export default App;
