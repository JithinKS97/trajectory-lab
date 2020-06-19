class RndBox {
  constructor({ x, y, s }) {
    this.x = x;
    this.y = y;
    this.s = s;

    this.rBox = new DBox({ x: x + s / 2, y: y + s / 2, s: 12 });
    this.dBox = new DBox({ x, y, s });
  }

  display() {
    this.dBox.display();
    this.rBox.display();
  }

  drag() {
    this.rBox.drag();
    this.dBox.drag();
  }
}
