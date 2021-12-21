interface ShipInterface {
  length: number;
  hits: number[];
  hit(position: number): void;
  isSunk(): boolean;
}

class Ship implements ShipInterface {
  length: number;
  hits: number[];

  constructor(length: number) {
    this.length = length;
    this.hits = [];
  }

  hit(position: number) {
    return
  }

  isSunk() {
    return true
  }
}

export default Ship;
