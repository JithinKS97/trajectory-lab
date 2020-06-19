class RndBox {
  constructor({ x, y, s }) {
    this.x = x;
    this.y = y;
    this.s = s;

    this.rBox = new DBox({ x: x + s / 2, y: y + s / 2, s: 12 });
    this.dBox = new DBox({ x, y, s });

    this.rBox.setIsConstrained(true);
  }

  display() {
    this.dBox.display();
    this.rBox.display();
  }

  drag() {
    this.dragRBox();
    this.dragDBox();
  }

  dragDBox() {
    this.dBox.drag();
    if (this.dBox.isBeingDragged) {
      this.rBox.setPos({
        x: this.dBox.x + this.dBox.s / 2,
        y: this.dBox.y + this.dBox.s / 2,
      });
    }
  }

  dragRBox() {
    this.rBox.drag();
    if (this.rBox.isBeingDragged) {
      this.dBox.setSideLength({
        s: 2 * (this.rBox.x - this.dBox.x),
      });
    }
  }
}
