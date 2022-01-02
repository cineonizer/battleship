import Ship from './Ship';

interface GameboardInterface {
  size: number;
  board: Ship[][];
  initializeBoard(): null[][];
  placeShip(ship: Ship, row: number, col: number, isVertical: boolean): void;
  receiveAttack(row: number, col: number): void;
}

class Gameboard implements GameboardInterface {
  readonly size: number;
  board: Ship[][];

  constructor() {
    this.size = 10;
    this.board = this.initializeBoard() as Ship[][];
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
    // invalid case for either overlapping or adjacent ships
    // a get method to return all valid adjacent coordinates of a cell
    const getAdajcentCoord = (row: number, col: number, index: number) => {
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
      // directional invalidity occurs when a direction violates the bounds of the board or another ship cell
      // examples of invalid directions for vertical ships:
      // example 1: the first cell has an invalid down direction because a ship cell is beneath it
      // example 2: the last cell has an invalid up direction because a ship cell is above it
      // example 3: all the cells in between the first and last cells has invalid up and down directions

      // examples of invalid directions for horizontal ships:
      // example 1: the first cell has an invalid right direction because there is a ship cell to its right
      // example 2: the last cell has an invalid left direction because there is a ship cell to its left
      // example 3: all the cells in between the first and last cells has invalid left and right directions

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
        // delete a direction if it falls out of bounds of the board
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
      // create an array of all the row values that the ship occupies
      const allRowVals = [...Array(ship.length).keys()].map((el) => el + row);
      const allAdjacentCoord: {
        [key: string]: { row: number; col: number };
      }[] = [];
      // for each (row, col) coordinate of the ship, push its adjacent cells' coordinates into a new array
      allRowVals.forEach((row, idx) => {
        allAdjacentCoord.push(getAdajcentCoord(row, col, idx));
      });
      // iterate through the array of all the adjacent coordinates and its directions
      for (const adjacentCoord of allAdjacentCoord) {
        for (const dir of Object.values(adjacentCoord)) {
          if (this.board[dir.row][dir.col]) return false;
        }
      }
    } else {
      const allColVals = [...Array(ship.length).keys()].map((el) => el + col);
      const allAdjacentCoord: {
        [key: string]: { row: number; col: number };
      }[] = [];
      allColVals.forEach((col, idx) => {
        allAdjacentCoord.push(getAdajcentCoord(row, col, idx));
      });
      for (const adjacentCoord of allAdjacentCoord) {
        for (const dir of Object.values(adjacentCoord)) {
          if (this.board[dir.row][dir.col]) return false;
        }
      }
    }
    return true;
  }

  receiveAttack(row: number, col: number) {
    if (row < 0 || row > this.size - 1 || col < 0 || col > this.size - 1) {
      return false;
    }
    if (this.board[row][col]) {
      let ship: Ship = this.board[row][col];
      let index: number = 0;
      // vertical ship layout
      if (this.board[row - 1][col]) {
        let i: number = 1;
        while (this.board[row - i][col]) {
          index++;
          i++;
        }
      }
      // horizontal ship layout
      else if (this.board[row][col - 1]) {
        let i: number = 1;
        while (this.board[row][col - i]) {
          index++;
          i++;
        }
      }
      ship.hit(index);
    }
  }
}

export default Gameboard;
