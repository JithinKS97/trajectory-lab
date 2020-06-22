let maxExtraRadius = 100;

class Hallow {
  constructor({ x, y, fill }) {
    this.x = x;
    this.y = y;

    this.hallowRadii = [
      maxExtraRadius,
      (2 / 3) * maxExtraRadius,
      (1 / 3) * maxExtraRadius,
    ];

    this.fill = fill;
  }

  display({ parentRadius }) {
    this.maxExtraRadius = parentRadius;
    push();
    noStroke();
    this.drawHallows(parentRadius);
    this.reduceHallowRadius();
    this.resetHallowRadius();
    pop();
  }

  drawHallows(s) {
    this.hallowRadii.forEach((hallowRadius) => {
      const transparency = map(hallowRadius, 0, maxExtraRadius, 80, 0);
      fill(...this.fill, transparency);
      circle(0, 0, s + hallowRadius);
    });
  }

  reduceHallowRadius() {
    this.hallowRadii.forEach((hallowRadius, index) => {
      this.hallowRadii[index] = hallowRadius - 1;
    });
  }

  resetHallowRadius() {
    this.hallowRadii.forEach((hallowRadius, index) => {
      if (hallowRadius < 0) {
        this.hallowRadii.splice(index, 1);
        this.hallowRadii = [maxExtraRadius, ...this.hallowRadii];
      }
    });
  }
}
