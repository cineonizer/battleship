import Ship from './Ship';

interface GameboardInterface {
  size: number;
  board: (Ship | null)[][];
  initializeBoard(): null[][];
  placeShip(ship: Ship, row: number, col: number): void;
}

class Gameboard implements GameboardInterface {
  readonly size: number;
  board: (Ship | null)[][];

  constructor() {
    this.size = 10;
    this.board = this.initializeBoard() as null[][];
  }

  initializeBoard() {
    return Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(null));
  }

  placeShip(ship: Ship, row: number, col: number) {
    if (!this.isPlacementValid) return;

    for (let i = 0; i < ship.length; i++) {
      this.board[row][col + i] = ship;
    }
  }

  private isPlacementValid(): boolean {
    return true;
  }
}

export default Gameboard;
