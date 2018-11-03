import React from "react";
import "./styles.css";

export default class extends React.Component {
  static displayName = "YouWin";
  render() {
    const params = new URLSearchParams(document.location.search.substring(1));
    const time = params.get("time");
    const score = params.get("score");
    const hunger = params.get("hunger");
    const carrots = params.get("carrots");
    return (
      <div style={{ height: "100vh", backgroundColor: "green", textAlign: "center" }}>
        <br />
        <br />
        <h1>Don&apos;t Get Too Hungry!</h1>
        <br />
        <h2 style={{ color: "orange" }}>YOU WIN</h2>
        <br />
        <p>Congratulations you collected 20 carrots.</p>
        <br />
        <p>You survived {time} seconds.</p>
        <p>Score: {score}</p>
        <p>Hunger: {hunger}</p>
        <p>Carrots: {carrots}</p>
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