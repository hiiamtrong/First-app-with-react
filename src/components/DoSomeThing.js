import React, { Component } from "react";
import './DoSomeThing.css'
class DoSomeThing extends Component {
  render() {
    return (
      <div>
        <h2 className="title">First App By TrongDev</h2>
        <h4>
          Major:
          <i> {this.props.major}</i>
        </h4>
        <h4>
          School:
          <i> {this.props.school}</i>
        </h4>
      </div>
    );
  }
}
export default DoSomeThing;
