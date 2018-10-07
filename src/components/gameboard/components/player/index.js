import React from "react";
import "./styles.css";

export default class extends React.Component {
  static displayName = "Player";
  render({ x, y } = this.props) {
    const style = {
      left: x,
      top: y,
    };
    return (
      <span className="Player" style={style}></span>
    );
  }
}