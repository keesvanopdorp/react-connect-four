import React, { ReactElement, ReactNode } from 'react';
import './App.scss';
import { Cell } from './components/Cell/Cell';

type player = 'player1' | 'player2';

interface Turn {
  player: string; x: number; y: number
}

export default class App extends React.Component {
  state = {
    grid: [
      ['', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '',],
    ],
    turn: "player1" as player,
    queue: [

    ] as Turn[]
  }

  loopTroughQueue(): void {
    this.state.queue.forEach((turn: Turn, index) => {
      const newGrid = this.state.grid;
      let newY = turn.y;
      while (newY < 6) {
        if (newGrid[newY === 5 ? 5 : newY + 1][turn.x] !== "y" && newGrid[newY === 5 ? 5 : newY + 1][turn.x] !== "r") {
          newY++;
          newGrid[newY][turn.x] = this.state.turn === "player1" ? "y" : "r"
          if (newY >= 1) {
            newGrid[newY - 1][turn.x] = '';
          }
          this.setState({ ...this.state, grid: newGrid });
        } else {
          break;
        }
      }
      const newQueue = this.state.queue;
      newQueue.splice(index);
    })
  }

  setGridPos(x: number, y: number): void {
    if (this.state.grid[y][x] === '') {
      const newGrid = this.state.grid;
      newGrid[y][x] = this.state.turn === "player1" ? "y" : "r";
      console.log([...this.state.queue, { player: this.state.turn, x, y }]);
      const queue = this.state.queue;
      queue.push({ player: this.state.turn, x, y });
      this.setState({ ...this.state, grid: newGrid, queue });
      this.loopTroughQueue();
      this.state.turn === "player1" ? this.setState({ ...this.state, turn: 'player2' }) : this.setState({ ...this.state, turn: 'player1' })
    }
    return;
  }

  setGameGrid(): void {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure that you want to reset?')) {
      this.setState({
        ...this.state, grid: [
          ['', '', '', '', '', '', '',],
          ['', '', '', '', '', '', '',],
          ['', '', '', '', '', '', '',],
          ['', '', '', '', '', '', '',],
          ['', '', '', '', '', '', '',],
          ['', '', '', '', '', '', '',],
        ]
      })
    }
  }

  public render(): ReactElement {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Connect Four</h1>
          <div>
            <button className="btn btn-danger" onClick={() => this.setGameGrid()}>Reset</button>
          </div>
        </div>
        <div className="game-grid">
          {this.state.grid.map((row: string[], y): ReactNode[] => {
            return row.map((cell: string, x): ReactNode => {
              let color: string;
              switch (cell) {
                case "r":
                  color = "red";
                  break;
                case "y":
                  color = "yellow";
                  break;
                default:
                  color = "#666666";
                  break;
              }
              if (y === 0) {
                return (
                  <Cell key={`grid[${x}][${y}]`} color={color} onclick={this.setGridPos.bind(this)} x={x} y={y} />
                )
              } else {
                return (
                  <Cell key={`grid[${x}][${y}]`} color={color} x={x} y={y} />
                )
              }
            })
          })}
        </div>
      </div>
    )
  }
}