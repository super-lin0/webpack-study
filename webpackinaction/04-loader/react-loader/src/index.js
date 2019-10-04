import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  render() {
    return <div>Hello World。。</div>;
  }
}

const render = () => ReactDOM.render(<App />, document.getElementById("app"));

render();
