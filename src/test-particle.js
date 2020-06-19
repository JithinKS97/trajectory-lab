class TestParticle {
  constructor() {
    this.rndMain = new RndBox({
      x: width / 2,
      y: height / 2,
      s: 20,
      drawInside: this.drawInside,
      mousePressed: this.rndMainMousePressed,
    });
    this.rndSub = new RndBox({
      x: width / 2,
      y: height / 2 + 40,
      s: 12,
      drawInside: this.drawInside,
    });
    this.diffX = 0;
    this.diffY = 0;
  }

  rndMainMousePressed = () => {
    this.diffX = this.rndSub.getPos()[0] - this.rndMain.getPos()[0];
    this.diffY = this.rndSub.getPos()[1] - this.rndMain.getPos()[1];
  };

  display() {
    this.drawLineBetween();
    this.rndMain.display();
    this.rndMainDrag();
    this.rndSub.display();
    this.rndSub.drag();
  }

  drawInside({ s }) {
    fill(180, 120, 70);
    noStroke();
    circle(0, 0, s);
  }

  drawLineBetween() {
    strokeWeight(2);
    line(...this.rndMain.getPos(), ...this.rndSub.getPos());
  }

  rndMainDrag() {
    this.rndMain.drag();
    if (this.rndMain.isDragged()) {
      this.rndSub.setPos({
        x: this.rndMain.getPos()[0] + this.diffX,
        y: this.rndMain.getPos()[1] + this.diffY,
      });
    }
  }

  getPosAndVel() {
    return {
      pos: this.rndMain.getPos(),
      vel: [
        this.rndSub.getPos()[0] - this.rndMain.getPos()[0],
        this.rndSub.getPos()[1] - this.rndMain.getPos()[1],
      ],
    };
  }
}
