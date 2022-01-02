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

  test('does not place a ship that runs out of bounds horizontally', () => {
    expect(game.placeShip(cruiser, 8, 8, false)).toBe('Invalid Placement');
  });

  test('does not place a ship that runs out of bounds vertically', () => {
    expect(game.placeShip(battleship, 8, 0, true)).toBe('Invalid Placement');
  });

  test('does not place a ship that is overlapping horizontally', () => {
    game.placeShip(carrier, 4, 7, true);
    expect(game.placeShip(battleship, 5, 4, false)).toBe('Invalid Placement');
  });

  test('does not place a ship that is overlapping vertically', () => {
    game.placeShip(carrier, 7, 2, false);
    expect(game.placeShip(submarine, 6, 2, true)).toBe('Invalid Placement');
  });

  test('does not place a ship that has adjacent ships', () => {
    game.placeShip(cruiser, 3, 4, false);
    expect(game.placeShip(battleship, 4, 4, false)).toBe('Invalid Placement');
    expect(game.placeShip(destroyer, 1, 5, true)).toBe('Invalid Placement');
  });

  test('receives an attack and hits a horizontal ship', () => {
    let opponentShip: Ship;
    game.placeShip(battleship, 3, 1, false);
    game.receiveAttack(3, 3);
    game.receiveAttack(3, 1);
    game.receiveAttack(3, 4);
    opponentShip = game.board[3][1];
    expect(opponentShip.hits).toEqual([2, 0, 3]);
  });

  test('receives an attack and hits a vertical ship', () => {
    let opponentShip: Ship;
    game.placeShip(battleship, 2, 6, true);
    game.receiveAttack(2, 6);
    game.receiveAttack(5, 6);
    opponentShip = game.board[2][6];
    expect(opponentShip.hits).toEqual([0, 3]);
  });
});
