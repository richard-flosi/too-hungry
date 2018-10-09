import React from "react";
import "./styles.css";

export default class extends React.Component {
  static displayName = "Hunger";
  render({ hunger } = this.props) {
    return (
      <span style={{ position: "absolute", bottom: 0, left: 25, backgroundColor: "pink", color: "black" }}>
        Hunger: {hunger}
      </span>
    );
  }

}