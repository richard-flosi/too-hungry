import React from "react";
import "./styles.css";

export default class extends React.Component {
  static displayName = "Hunger";
  render({ hunger } = this.props) {
    return (
      <span style={{ width: 200, height: 50, backgroundColor: "pink", color: "black", opacity: 0.5 }}>
        Hunger: {hunger}
      </span>
    );
  }

}