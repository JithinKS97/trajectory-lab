let rndBoxes = [];

function setup() {
  createCanvas(400, 400);
  rndBoxes.push(new RndBox({ x: width / 2 + 80, y: height / 2, s: 100 }));
  rndBoxes.push(new RndBox({ x: width / 2 - 80, y: height / 2, s: 50 }));
}

function draw() {
  background(0);

  rndBoxes.forEach((rndBox) => {
    rndBox.display();
    rndBox.drag();
  });
}
