import React from "react";
import "./App.css";
import GameBoard from "./components/gameboard";

export default class extends React.Component {
  static displayName = "App";
  render() {
    return (
      <GameBoard />
    );
  }
}