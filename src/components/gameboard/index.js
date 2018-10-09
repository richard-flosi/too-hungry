import React from "react";
import "./styles.css";

import Hunger from "./components/hunger";
import Inventory from "./components/inventory";
import Carrot from "./components/carrot";
import Player from "./components/player";

export default class extends React.Component {
  static displayName = "GameBoard";
  constructor(props, context) {
    super(props, context);
    this.state = {
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
  componentDidMount() {
    const { moveBy } = this.state;
    this.gameBoard.focus(); 
    const maxX = Math.round(((this.gameBoard.clientWidth - 50)) / moveBy) * moveBy;
    const maxY = Math.round(((this.gameBoard.clientHeight - 50)) / moveBy) * moveBy;
    const midX = maxX / 2;
    const midY = maxY / 2;
    this.setState({
      bounds: {
        minX: 0,
        maxX,
        minY: 0,
        maxY,
      },
      carrots: [
        { x: 0, y: 0 },
        { x: maxX, y: 0 },
        { x: 0, y: maxY },
        { x: maxX, y: maxY },
      ],
      player: {
        hunger: 100,
        carrots: 0,
        x: midX,
        y: midY,
      },
      carrotInterval: setInterval(() => this.generateCarrot(), 5000),
      hungerInterval: setInterval(() => this.generateHunger(), 10000),
    });
  }
  generateCarrot({ bounds, carrots, maxCarrots, moveBy } = this.state) {
    let x = Math.round(Math.random() * bounds.maxX / moveBy) * moveBy;
    let y = Math.round(Math.random() * bounds.maxY / moveBy) * moveBy;
    if (carrots.length < maxCarrots) {
      this.setState({ carrots: [ ...carrots, { x, y } ] });
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
      window.location = "/gameover";
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
      x = player.x;
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
      x = player.x;
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
      y = player.y;
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
      y = player.y;
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
  render() {
    return (
      <div
        className="GameBoard"
        tabIndex="1"
        onKeyDown={(event) => this.onKeyDown(event)}
        onKeyPress={(event) => this.onKeyPress(event)}
        ref={(ref) => { this.gameBoard = ref; }}
      >
        <Player x={this.state.player.x} y={this.state.player.y} />
        {this.state.carrots.map(({ x, y }, index) => <Carrot key={`carrot-${index}-${x}-${y}`} x={x} y={y} />)}
        <Hunger hunger={this.state.player.hunger} />
        <Inventory player={this.state.player} />
      </div>
    );
  }
}