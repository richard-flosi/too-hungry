import React from "react";
import "./styles.css";

export default class extends React.Component {
  static displayName = "Score";
  render({ score } = this.props) {
    return (
      <span style={{ position: "absolute", top: 0, right: 25, backgroundColor: "gold", color: "black" }}>
        Score: {score}
      </span>
    );
  }
}