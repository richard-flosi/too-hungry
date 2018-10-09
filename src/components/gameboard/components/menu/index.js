import React from "react";
import "./styles.css";

import carrot from "../carrot/carrot.svg";
import player from "../player/player.svg";

export default class extends React.Component {
  static displayName = "Menu";
  render({ play } = this.props) {
    return (
      <div style={{ height: "100vh", backgroundColor: "green", color: "orange", textAlign: "center" }}>
        <img src={player} alt="player" height={400} style={{ position: "absolute", top: 20, left: 20 }} />
        <img src={carrot} alt="carrot" height={400} style={{ position: "absolute", top: 20, right: 20 }} />
        <br />
        <br />
        <h1>Don't Get Too Hungry!</h1>
        <br />
        <br />
        <button
          style={{ width: 250, height: 50, backgroundColor: "black", color: "white", cursor: "pointer" }}
          onClick={play}
        >
          <h3>PLAY</h3>
        </button>
        <br />
        <br />
        <h2 style={{ color: "black" }}>Instructions</h2>
        <p style={{ color: "white" }}>Use the <b style={{ color: "black" }}>Arrow Keys</b> to move.</p>
        <p style={{ color: "white" }}>Press the <b style={{ color: "black" }}>Space Bar</b> to pick up carrots.</p>
        <p style={{ color: "white" }}>Press <b style={{ color: "black" }}>e</b> to eat a carrot from your inventory.</p>
      </div>
    );
  }
}