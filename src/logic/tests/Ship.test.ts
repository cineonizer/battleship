import Ship from '../Ship';

describe('The ship', () => {
  let ship: Ship;

  // setup and instantiating the Ship class
  beforeEach(() => {
    ship = new Ship(5);
  });

  test('is created and instantiated', () => {
    expect(ship).toEqual({
      length: 5,
      hits: [],
    });
  });

  test('is hit once', () => {
    ship.hit(3);
    expect(ship.hits).toEqual([3]);
  });

  test('is hit multiple times', () => {
    ship.hit(0);
    ship.hit(4);
    ship.hit(1);
    expect(ship.hits).toEqual([0, 4, 1]);
  });

  test('is not hit', () => {
    ship.hit(-1);
    ship.hit(5);
    expect(ship.hits).toEqual([]);
  });

  test('is not hit in the same position more than once', () => {
    ship.hit(0);
    ship.hit(0);
    expect(ship.hits).toEqual([0]);
  });

  test('is sunk', () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    ship.hit(4);
    expect(ship.isSunk()).toBe(true);
  });

  test('is not sunk', () => {
    ship.hit(3);
    expect(ship.isSunk()).toBe(false);
  });
});
