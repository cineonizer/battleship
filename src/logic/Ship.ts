interface ShipInterface {
  length: number;
  hits: number[];
  hit(position: number): void;
  isSunk(): boolean;
}

class Ship implements ShipInterface {
  readonly length: number;
  hits: number[];

  constructor(length: number) {
    this.length = length;
    this.hits = [];
  }

  hit(position: number) {
    if (
      position < 0 ||
      position > this.length - 1 ||
      this.hits.includes(position)
    ) {
      return;
    }
    this.hits.push(position);
  }

  isSunk() {
    return this.length === this.hits.length;
  }
}

export default Ship;
