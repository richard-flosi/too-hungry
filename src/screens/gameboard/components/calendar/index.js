import React from "react";
import "./styles.css";

export default class extends React.Component {
  static displayName = "Calendar";
  render({ time } = this.props) {
    return (
      <span style={{ position: "absolute", top: 0, left: 25, backgroundColor: "aqua", color: "black" }}>
        Time: {time}
      </span>
    );
  }

}