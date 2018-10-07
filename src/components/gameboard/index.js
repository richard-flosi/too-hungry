import React from "react";
import "./styles.css";

import Player from "./components/player";
import Carrot from "./components/carrot";

export default class extends React.Component {
  static displayName = "GameBoard";
  constructor(props, context) {
    super(props, context);
    this.state = {
      initialized: false,
      gameOver: false,
      playing: false,
      moveBy: 10,
      bounds: {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
      },
      carrotInterval: null,
      hungerInterval: null,
      carrots: [],
      maxCarrots: 10,
      player: {
        hunger: 100,
        carrots: 0,
        x: 0,
        y: 0,
      },
    };
  }
  initialize({ initialized, moveBy } = this.state) {
    if (!initialized) {
      this.gameBoard.focus(); 
      const maxX = this.gameBoard.clientWidth - 20;
      const maxY = this.gameBoard.clientHeight - 20;
      const midX = Math.round((maxX / 2) / moveBy) * moveBy;
      const midY = Math.round((maxY / 2) / moveBy) * moveBy;
      this.setState({
        initialized: true,
        gameOver: false,
        bounds: {
          minX: 0,
          maxX,
          minY: 0,
          maxY,
        },
        player: {
          hunger: 100,
          carrots: 0,
          x: midX,
          y: midY,
        },
        carrotInterval: setInterval(this.generateCarrot.bind(this), 5000),
        hungerInterval: setInterval(this.generateHunger.bind(this), 10000)
      });
    }
  }
  generateCarrot({ bounds, carrots, maxCarrots, moveBy } = this.state) {
    if (carrots.length < maxCarrots) {
      this.setState({
        carrots: [
          ...carrots,
          {
            x: Math.round(Math.random() * bounds.maxX / moveBy) * moveBy,
            y: Math.round(Math.random() * bounds.maxY / moveBy) * moveBy,
          },
        ],
      });
    }
  }
  generateHunger({ player, carrotInterval, hungerInterval } = this.state) {
    if (player.hunger > 10) {
      this.setState({
        player: {
          ...player,
          hunger: player.hunger - 10,
        }
      });
    } else {
      clearInterval(carrotInterval);
      clearInterval(hungerInterval);
      this.setState({ gameOver: true });
    }
  }
  onKeyDown(event) {
    switch(event.key) {
      case "ArrowLeft":
        return this.moveLeft();
      case "ArrowRight":
        return this.moveRight();
      case "ArrowUp":
        return this.moveUp();
      case "ArrowDown":
        return this.moveDown();
      default:
        return;
    }
  }
  moveLeft({ bounds, player, moveBy } = this.state) {
    let x = player.x - moveBy;
    if (x < bounds.minX) {
      x = bounds.minX;
    }
    this.setState({
      player: { 
        ...player,
        x,
      }
    });
  }
  moveRight({ bounds, player, moveBy } = this.state) {
    let x = player.x + moveBy;
    if (x > bounds.maxX) {
      x = bounds.maxX;
    }
    this.setState({
      player: {
        ...player,
        x,
      }
    });
  }
  moveUp({ bounds, player, moveBy } = this.state) {
    let y = player.y - moveBy;
    if (y < bounds.minY) {
      y = bounds.minY;
    }
    this.setState({
      player: {
        ...player,
        y,
      }
    });
  }
  moveDown({ bounds, player, moveBy } = this.state) {
    let y = player.y + moveBy;
    if (y > bounds.maxY) {
      y = bounds.maxY;
    }
    this.setState({
      player: {
        ...player,
        y,
      }
    });
  }
  onKeyPress(event) {
    switch(event.key) {
      case " ":
        return this.pickCarrot();
      case "e":
        return this.eatCarrot();
      default:
        return;
    }
  }
  pickCarrot({ player, carrots } = this.state) {
    const foundCarrot = carrots.find((carrot) => {
      console.log("foundCarrot", foundCarrot, player, carrot, (player.x === carrot.x && player.y === carrot.y));
      return (player.x === carrot.x && player.y === carrot.y);
    });
    if (foundCarrot) {
      this.setState({
        carrots: carrots.filter(
          (carrot) => {
            if (player.x === carrot.x && player.y === carrot.y) {
              return false;
            } else {
              return true;
            }
          }
        ),
        player: {
          ...player,
          carrots: player.carrots + 1,
        }
      });  
    }
  }
  eatCarrot({ player } = this.state) {
    if (player.carrots > 0) {
      this.setState({
        player: {
          ...player,
          hunger:  Math.min(Math.max(parseInt(player.hunger + 5), 1), 100),
          carrots: player.carrots - 1,
        }
      });
    }
  }
  play() {
    this.setState({ initialized: false, gameOver: false, playing: true });
  }
  quit() {
    this.setState({ initialized: false, gameOver: false, playing: false });
  }
  renderCarrot({ x, y }, index) {
    return (
      <Carrot key={`carrot-${index}-${x}-${y}`} x={x} y={y} />
    );
  }
  renderCarrots({ carrots } = this.state) {
    return carrots.map(this.renderCarrot);
  }
  renderPlayer({ x, y } = this.state.player) {
    return (
      <Player x={x} y={y} />
    );
  }
  renderHunger({ hunger } = this.state.player) {
    return (
      <span style={{ width: 200, height: 50, backgroundColor: "pink", color: "black", opacity: 0.5 }}>
        Hunger: {hunger}
      </span>
    );
  }
  renderInventory({ player } = this.state) {
    return (
      <span style={{ width: 200, height: 50, backgroundColor: "green", color: "orange", opacity: 0.5 }}>
        Carrots: {player.carrots}
      </span>
    );
  }
  renderGameOver() {
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
          onClick={this.play.bind(this)}
        >
          <h3>TRY AGAIN</h3>
        </button>
        <br />
        <br />
        <br />
        <button
          style={{ width: 250, height: 50, border: "1px solid black", boxSizing: "border-box", backgroundColor: "white", color: "black", cursor: "pointer" }}
          onClick={this.quit.bind(this)}
        >
          <h3>QUIT</h3>
        </button>
      </div>
    );
  }
  renderGameBoard() {
    return (
      <div
        className="GameBoard"
        tabIndex="1"
        onKeyDown={this.onKeyDown.bind(this)}
        onKeyPress={this.onKeyPress.bind(this)}
        ref={(ref) => { this.gameBoard = ref; this.initialize(); }}
      >
        {this.renderCarrots()}
        {this.renderPlayer()}
        {this.renderHunger()}
        {this.renderInventory()}
      </div>
    );
  }
  renderMenu() {
    return (
      <div style={{ height: "100vh", backgroundColor: "green", color: "orange", textAlign: "center" }}>
        <br />
        <br />
        <h1>Don't Get Too Hungry!</h1>
        <br />
        <br />
        <button
          style={{ width: 250, height: 50, backgroundColor: "black", color: "white", cursor: "pointer" }}
          onClick={this.play.bind(this)}
        >
          <h3>PLAY</h3>
        </button>
        <br />
        <br />
        <h2 style={{ color: "black" }}>Instructions</h2>
        <p style={{ color: "white" }}>Press the <b style={{ color: "black" }}>Space Bar</b> to pick up carrots.</p>
        <p style={{ color: "white" }}>Press <b style={{ color: "black" }}>e</b> to eat a carrot from your inventory.</p>
      </div>
    );
  }
  render({ playing, gameOver } = this.state) {
    if (gameOver) {
      return this.renderGameOver();
    } else if (playing) {
      return this.renderGameBoard();
    } else {
      return this.renderMenu();
    }
  }
}