import Ship from './Ship';

interface GameboardInterface {
  size: number;
  board: Ship[][];
}

class Gameboard implements GameboardInterface {
  readonly size: number;
  board: Ship[][];

  constructor() {
    this.size = 10;
    this.board = this.initializeBoard();
  }

  initializeBoard() {
    return Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(null));
  }
}

export default Gameboard;
