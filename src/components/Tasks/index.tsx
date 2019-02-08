import React, { Component } from 'react'

import "./index.css"

interface IProps{
    day: Date,
    visible: boolean,
}

export default class Tasks extends Component<IProps> {
  render() {
    console.log(this.props);
    return (
      <div className = "tasks">
         <header>
           {this.props.day+""}
         </header>
      </div>
    )
  }
}
