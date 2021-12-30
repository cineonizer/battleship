import { check } from 'prettier';
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
    // invalid case when ships overlap
    if (isVertical) {
      // this assignment creates an array of all row values based on the ship length
      // Array(ship.length).keys() will create an array iterator from index 0 to the ship length
      // then map over the array spread operator [...] to assign the correct row coordinates
      const allRowVals = [...Array(ship.length).keys()].map((el) => el + row);
      if (allRowVals.some((rowVal) => this.board[rowVal][col])) return false;
    } else {
      const allColVals = [...Array(ship.length).keys()].map((el) => el + col);
      if (allColVals.some((colVal) => this.board[row][colVal])) return false;
    }

    // invalid case when there are adjacent ships
    // a getCoord method to return all possible neighboring coordinates of a cell
    const getCoord = (row: number, col: number, index: number) => {
      const coordinates: { [key: string]: { row: number; col: number } } = {
        up: { row: row - 1, col: col },
        down: { row: row + 1, col: col },
        right: { row: row, col: col + 1 },
        left: { row: row, col: col - 1 },
        upright: { row: row - 1, col: col + 1 },
        upleft: { row: row - 1, col: col - 1 },
        downright: { row: row + 1, col: col + 1 },
        downleft: { row: row + 1, col: col - 1 },
      };
      // iterate through the coordinates object and delete any direction that is invalid
      for (const [dir, coord] of Object.entries(coordinates)) {
        if (isVertical) {
          if (index === 0 && dir.includes('down')) {
            delete coordinates[dir];
          } else if (index === ship.length - 1 && dir.includes('up')) {
            delete coordinates[dir];
          } else if (
            index > 0 &&
            index < ship.length - 1 &&
            (dir.includes('up') || dir.includes('down'))
          ) {
            delete coordinates[dir];
          }
        } else {
          if (index === 0 && dir.includes('right')) {
            delete coordinates[dir];
          } else if (index === ship.length - 1 && dir.includes('left')) {
            delete coordinates[dir];
          } else if (
            index > 0 &&
            index < ship.length - 1 &&
            (dir.includes('left') || dir.includes('right'))
          ) {
            delete coordinates[dir];
          }
        }
        // delete direction if it falls out of bounds
        if (
          coord.row < 0 ||
          coord.row > this.size - 1 ||
          coord.col < 0 ||
          coord.col > this.size - 1
        ) {
          delete coordinates[dir];
        }
      }
      return coordinates;
    };

    if (isVertical) {
      const allRowVals = [...Array(ship.length).keys()].map((el) => el + row);
    } else {
      const allColVals = [...Array(ship.length).keys()].map((el) => el + col);
      if (
        allColVals.some((col, idx) => {
          const allCoord = Object.values(getCoord(row, col, idx));
          if (allCoord.some((coord) => this.board[coord.row][coord.col])) return true
        })
      )
        return false;
    }
    return true;
  }
}

export default Gameboard;
