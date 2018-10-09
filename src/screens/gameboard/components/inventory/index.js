import React from "react";
import "./styles.css";

export default class extends React.Component {
  static displayName = "Inventory";
  render({ player } = this.props) {
    return (
      <span style={{ position: "absolute", bottom: 0, right: 25, backgroundColor: "green", color: "orange" }}>
        Carrots: {player.carrots}
      </span>
    );
  }
}