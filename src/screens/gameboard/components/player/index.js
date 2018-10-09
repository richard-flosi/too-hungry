import React from "react";
import "./styles.css";
import player from "./player.svg";

export default class extends React.Component {
  static displayName = "Player";
  render({ x, y } = this.props) {
    const style = {
      left: x,
      top: y,
    };
    return (
      <img className="Player" alt="player" src={player} style={style} />
    );
  }
}