import React from "react";
import "./styles.css";

export default class extends React.Component {
  static displayName = "Inventory";
  render({ player } = this.props) {
    return (
      <span style={{ width: 200, height: 50, backgroundColor: "green", color: "orange", opacity: 0.5 }}>
        Carrots: {player.carrots}
      </span>
    );
  }
}