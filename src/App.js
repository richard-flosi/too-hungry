import React from "react";
import GameBoard from "./components/gameboard";

export default class extends React.Component {
  static displayName = "App";
  render() {
    return (
      <GameBoard />
    );
  }
}