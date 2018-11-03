import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Menu from "./screens/menu";
import GameBoard from "./screens/gameboard";
import GameOver from "./screens/gameover";
import YouWin from "./screens/youwin";

export default class extends React.Component {
  static displayName = "App";
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Menu}/>
          <Route exact path="/play" component={GameBoard}/>
          <Route exact path="/gameover" component={GameOver}/>
          <Route exact path="/youwin" component={YouWin}/>
        </React.Fragment>
      </Router>
      
    );
  }
}