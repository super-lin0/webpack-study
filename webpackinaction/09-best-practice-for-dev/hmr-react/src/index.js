import React, { Component } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";

class App extends Component {
  render() {
    return <div>Hello World。。</div>;
  }
}

const AppComponent = hot(module)(App);

const render = () =>
  ReactDOM.render(<AppComponent />, document.getElementById("app"));

render();
