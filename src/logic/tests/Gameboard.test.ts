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

  test('does not place a ship out of bounds', () => {
    expect(game.placeShip(cruiser, 10, 10, false)).toBe('Invalid Placement');
  });

  test('does not place a ship horizontally that runs out of bounds', () => {
    expect(game.placeShip(submarine, 8, 8, false)).toBe('Invalid Placement');
  });

  test('does not place a ship vertically that runs out of bounds', () => {
    expect(game.placeShip(battleship, 8, 0, true)).toBe('Invalid Placement');
  });

  test('does not place a ship horizontally on occupied spaces', () => {
    game.placeShip(carrier, 4, 7, true);
    expect(game.placeShip(battleship, 5, 4, false)).toBe('Invalid Placement');
  });
  test('does not place a ship vertically on occupied spaces', () => {
    game.placeShip(carrier, 7, 2, false);
    expect(game.placeShip(destroyer, 6, 2, true)).toBe('Invalid Placement');
  });
});
