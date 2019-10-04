import React, { Component } from "react";
import ReactDOM from "react-dom";

import AppWl from "npm-react-wl";

class App extends Component {
  render() {
    return (
      <div>
        <AppWl />
      </div>
    );
  }
}

const render = () => ReactDOM.render(<App />, document.getElementById("app"));

render();
