class Source {
  constructor({ x, y, s }) {
    this.rndBox = new RndBox({ x, y, s, drawInside: this.drawInside });
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
    circle(0, 0, s);
  };

  isSelected = () => {
    return this.rndBox.isSelected();
  };
}
