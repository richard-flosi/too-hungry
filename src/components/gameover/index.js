import React from "react";
import "./styles.css";

export default class extends React.Component {
  static displayName = "GameOver";
  render() {
    return (
      <div style={{ height: "100vh", backgroundColor: "pink", textAlign: "center" }}>
        <br />
        <br />
        <h1>Don't Get Too Hungry!</h1>
        <br />
        <h2>GAME OVER</h2>
        <br />
        <br />
        <br />
        <a
          href="/play"
          style={{ display: "inline-block", textDecoration: "none", border: "1px solid white", boxSizing: "border-box", width: 250, backgroundColor: "black", color: "white", cursor: "pointer" }}
        >
          <h3>PLAY AGAIN</h3>
        </a>
        <br />
        <br />
        <br />
        <a
          href="/"
          style={{ display: "inline-block", textDecoration: "none", border: "1px solid black", boxSizing: "border-box", width: 250, backgroundColor: "white", color: "black", cursor: "pointer" }}
        >
          <h3>QUIT</h3>
        </a>
      </div>
    );
  }
}