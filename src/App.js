import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Menu from "./components/menu";
import GameBoard from "./components/gameboard";
import GameOver from "./components/gameover";

export default class extends React.Component {
  static displayName = "App";
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Menu}/>
          <Route exact path="/play" component={GameBoard}/>
          <Route exact path="/gameover" component={GameOver}/>
        </React.Fragment>
      </Router>
      
    );
  }
}