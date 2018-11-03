import React from "react";
import "./styles.css";

import Hunger from "./components/hunger";
import Inventory from "./components/inventory";
import Calendar from "./components/calendar";
import Score from "./components/score";
import Carrot from "./components/carrot";
import Player from "./components/player";

export default class extends React.Component {
  static displayName = "GameBoard";
  constructor(props, context) {
    super(props, context);
    this.state = {
      startTime: 0,
      time: 0,
      score: 0,
      moveBy: 10,
      bounds: {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
      },
      timeInterval: null,
      carrotInterval: null,
      hungerInterval: null,
      carrots: [],
      maxCarrots: 15,
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
    const bounds = {
      minX: 0,
      maxX,
      minY: 0,
      maxY,
    };
    this.setState({
      startTime: Date.now(),
      time: 0,
      score: 0,
      bounds,
      carrots: [
        this.createRandomXY({ bounds, moveBy }),
        this.createRandomXY({ bounds, moveBy }),
        this.createRandomXY({ bounds, moveBy }),
        this.createRandomXY({ bounds, moveBy }),
        this.createRandomXY({ bounds, moveBy }),
      ],
      player: {
        hunger: 100,
        carrots: 0,
        ...this.createRandomXY({ bounds, moveBy }),
      },
      timeInterval: setInterval(() => this.generateTime(), 60),
      carrotInterval: setInterval(() => this.generateCarrot(), 5000),
      hungerInterval: setInterval(() => this.generateHunger(), 10000),
    });
  }
  createRandomXY({ bounds, moveBy } = this.state) {
    const x = Math.round(Math.random() * bounds.maxX / moveBy) * moveBy;
    const y = Math.round(Math.random() * bounds.maxY / moveBy) * moveBy;
    return { x, y };
  }
  generateTime({ startTime } = this.state) {
    this.setState({ time: Math.round((Date.now() - startTime) / 1000) });
  }
  generateCarrot({ carrots, maxCarrots } = this.state) {
    if (carrots.length < maxCarrots) {
      this.setState({ carrots: [ ...carrots, this.createRandomXY() ] });
    }
  }
  generateHunger({ player, timeInterval, carrotInterval, hungerInterval, time, score } = this.state) {
    if (player.hunger > 10) {
      this.setState({
        player: {
          ...player,
          hunger: player.hunger - 10,
        }
      });
    } else {
      clearInterval(timeInterval);
      clearInterval(carrotInterval);
      clearInterval(hungerInterval);
      window.location = `/gameover?time=${time}&score=${score}&hunger=${player.hunger}&carrots=${player.carrots}`;
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
  findCarrots({ player, carrots } = this.state) {
    const width = 50;
    const height = 50;
    let foundCarrots = [];
    let remainingCarrots = [];
    carrots.forEach((carrot) => {
      if (player.x < carrot.x + width &&
        player.x + width > carrot.x &&
        player.y < carrot.y + height &&
        player.y + height > carrot.y) {
         foundCarrots.push(carrot);
      } else {
        remainingCarrots.push(carrot);
      }
    });
    return { foundCarrots, remainingCarrots };
  }
  pickCarrot({ score, player } = this.state) {
    const { foundCarrots, remainingCarrots } = this.findCarrots();
    const numberOfFoundCarrots = foundCarrots.length;
    const playerCarrots = player.carrots + numberOfFoundCarrots;
    if (numberOfFoundCarrots > 0) {
      this.setState({
        score: score + (numberOfFoundCarrots * 5),
        carrots: remainingCarrots,
        player: {
          ...player,
          carrots: playerCarrots,
        }
      }, () => {
        const { time, score, player } = this.state;
        if (player.carrots >= 20) {
          window.location = `/youwin?time=${time}&score=${score}&hunger=${player.hunger}&carrots=${player.carrots}`;
        }
      });
    }
  }
  eatCarrot({ score, player } = this.state) {
    let hunger = player.hunger + 5;
    if (hunger > 100) {
      hunger = 100;
    }
    if (player.carrots > 0) {
      this.setState({
        score: score + 5,
        player: {
          ...player,
          hunger,
          carrots: player.carrots - 1,
        }
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div
          className="GameBoard"
          tabIndex="1"
          onKeyDown={(event) => this.onKeyDown(event)}
          onKeyPress={(event) => this.onKeyPress(event)}
          ref={(ref) => { this.gameBoard = ref; }}
        >
          <Player x={this.state.player.x} y={this.state.player.y} />
          {this.state.carrots.map(({ x, y }, index) => <Carrot key={`carrot-${index}-${x}-${y}`} x={x} y={y} />)}
        </div>
        <Calendar time={this.state.time} />
        <Score score={this.state.score} />
        <Hunger hunger={this.state.player.hunger} />
        <Inventory player={this.state.player} />
      </React.Fragment>
    );
  }
}