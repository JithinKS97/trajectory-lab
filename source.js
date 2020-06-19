class Source {
  constructor({ x, y, s }) {
    this.rndBox = new RndBox({ x, y, s, drawInside: this.drawInside });
  }

  display = () => {
    this.rndBox.display();
    this.rndBox.drag();
    this.rndBox.resize();
  };

  drawInside = ({ s }) => {
    circle(0, 0, s);
  };
}
