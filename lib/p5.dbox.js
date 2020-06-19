class DBox {
  constructor({ x, y, s }) {
    this.x = x;
    this.y = y;
    this.s = s;

    this.isBeingDragged = false;
    this.isSelected = false;

    _renderer.elt.addEventListener("mousedown", this.mousePressed);
    _renderer.elt.addEventListener("mouseup", this.mouseReleased);

    DBox.isAnyBeingDragged = false;

    // Special properties //

    this.isConstrained = false;
  }

  mousePressed = () => {
    if (this.isMouseInsideBox()) {
      if (!DBox.canBeDragged()) {
        return;
      }
      this.isBeingDragged = true;
    }
  };

  mouseReleased = () => {
    this.isBeingDragged = false;
    DBox.setIsAnyBeingDragged(false);
  };

  display = () => {
    rectMode(CENTER);
    stroke(255);
    noFill();
    square(this.x, this.y, this.s);
  };

  drag = () => {
    if (this.isBeingDragged) {
      this.x += mouseX - pmouseX;
      if (this.isConstrained) {
        this.y += mouseX - pmouseX;
      } else {
        this.y += mouseY - pmouseY;
      }
    }
  };

  isMouseInsideBox = () => {
    return this.isPtInside(mouseX, mouseY);
  };

  isPtInside = (x, y) => {
    return (
      x < this.x + this.s / 2 &&
      x > this.x - this.s / 2 &&
      y < this.y + this.s / 2 &&
      y > this.y - this.s / 2
    );
  };

  setIsConstrained(isConstrained) {
    this.isConstrained = isConstrained;
  }

  setPos({ x, y }) {
    this.x = x;
    this.y = y;
  }

  setSideLength({ s }) {
    this.s = s;
  }

  ////////////////////////////////////
  ///////// Static methods //////////
  //////////////////////////////////

  static canBeDragged = () => {
    if (DBox.isAnyBeingDragged) {
      return false;
    } else {
      DBox.setIsAnyBeingDragged(true);
      return true;
    }
  };

  static setIsAnyBeingDragged = (isAnyDragging) => {
    DBox.isAnyBeingDragged = isAnyDragging;
  };
}
