class Source {
  constructor({ x, y, s, fill }) {
    this.rndBox = new RndBox({
      x,
      y,
      s,
      drawInside: this.drawInside,
    });

    this.hallow = new Hallow({
      x,
      y,
      parentRadius: s,
      extraRadius: 50,
      fill,
    });

    this.fill = fill;
  }

  display = () => {
    this.rndBox.display();
    this.rndBox.drag();
    this.rndBox.resize();
  };

  clearEvents() {
    this.rndBox.clearEvents();
  }

  drawInside = ({ s }) => {
    push();
    this.hallow.display({ parentRadius: s });
    fill(...this.fill);
    noStroke();
    circle(0, 0, s);
    pop();
  };

  isSelected = () => {
    return this.rndBox.isSelected();
  };

  getPos = () => {
    return this.rndBox.getPos();
  };

  setPos = ({ x, y }) => {
    this.rndBox.setPos({ x, y });
  };

  getSize = () => {
    return this.rndBox.getSize();
  };
}
