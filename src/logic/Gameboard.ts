import Ship from './Ship';

interface GameboardInterface {
  size: number;
  board: (Ship | null)[][];
  initializeBoard(): null[][];
  placeShip(ship: Ship, row: number, col: number, isVertical: boolean): void;
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

  placeShip(ship: Ship, row: number, col: number, isVertical: boolean) {
    if (!this.isPlacementValid(ship, row, col, isVertical)) {
      return 'Invalid Placement';
    }
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i] = ship;
      }
    }
  }

  private isPlacementValid(
    ship: Ship,
    row: number,
    col: number,
    isVertical: boolean
  ): boolean {
    // invalid case when the ship is placed out of bounds
    if (row < 0 || col < 0 || row > this.size - 1 || col > this.size - 1) {
      return false;
    }
    // invalid case when the ship length runs out of bounds
    if (isVertical) {
      if (row + ship.length > this.size) return false;
    } else {
      if (col + ship.length > this.size) return false;
    }
    // invalid case when the ship is placed on occupied spaces
    // [4, 5, 6, 7]
    if (isVertical) {
      const allRowVals = [...Array(ship.length).keys()].map((el) => el + row);
      if (allRowVals.some((rowVal) => this.board[rowVal][col])) return false;
    } else {
      // this assignment creates an array of all column values based on the ship length
      // Array(ship.length).keys() will create an array iterator from index 0 to the ship length
      // then map over the array spread operator [...] to assign the correct column coordinates
      const allColVals = [...Array(ship.length).keys()].map((el) => el + col);
      if (allColVals.some((colVal) => this.board[row][colVal])) return false;
    }
    return true;
  }
}

export default Gameboard;
