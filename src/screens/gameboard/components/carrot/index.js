import React from "react";
import "./styles.css";
import carrot from "./carrot.svg";

export default class extends React.Component {
  static displayName = "Carrot";
  render({ x, y } = this.props) {
    const style = {
      left: x,
      top: y,
    };
    return (
      <img className="Carrot" src={carrot} alt="carrot" style={style} />
    );
  }
}