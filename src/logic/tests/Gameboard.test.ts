import Gameboard from '../Gameboard';
import Ship from '../Ship';

describe('The gameboard', () => {
  let game: Gameboard;
  let testBoard: (Ship | null)[][];
  let carrier: Ship;
  let battleship: Ship;
  let cruiser: Ship;
  let submarine: Ship;
  let destroyer: Ship;

  beforeEach(() => {
    game = new Gameboard();
    testBoard = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    carrier = new Ship(5);
    battleship = new Ship(4);
    cruiser = new Ship(3);
    submarine = new Ship(3);
    destroyer = new Ship(2);
  });

  test('is created and initialized', () => {
    // verify that the test board has the correct number of rows and columns in 2D array
    expect(testBoard).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
    // then test the game board against the test board, which has the same code
    expect(game.board).toEqual(testBoard);
  });

  test('places a ship horizontally', () => {
    game.placeShip(carrier, 4, 5, false);
    testBoard[4][5] = carrier;
    testBoard[4][6] = carrier;
    testBoard[4][7] = carrier;
    testBoard[4][8] = carrier;
    testBoard[4][9] = carrier;
    expect(game.board).toEqual(testBoard);
  });

  test('places a ship vertically', () => {
    game.placeShip(battleship, 2, 1, true);
    testBoard[2][1] = battleship;
    testBoard[3][1] = battleship;
    testBoard[4][1] = battleship;
    testBoard[5][1] = battleship;
    expect(game.board).toEqual(testBoard);
  });
});
