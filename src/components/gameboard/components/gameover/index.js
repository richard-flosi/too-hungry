import React from "react";
import "./styles.css";

export default class extends React.Component {
  static displayName = "GameOver";
  render({ play, quit } = this.props) {
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
        <button
          style={{ width: 250, height: 50, backgroundColor: "black", color: "white", cursor: "pointer" }}
          onClick={play}
        >
          <h3>TRY AGAIN</h3>
        </button>
        <br />
        <br />
        <br />
        <button
          style={{ width: 250, height: 50, border: "1px solid black", boxSizing: "border-box", backgroundColor: "white", color: "black", cursor: "pointer" }}
          onClick={quit}
        >
          <h3>QUIT</h3>
        </button>
      </div>
    );
  }
}