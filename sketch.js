let dBoxes = [];

function setup() {
  createCanvas(400, 400);
  dBoxes.push(new DBox({ x: width / 2 + 80, y: height / 2, s: 100 }));
  dBoxes.push(new DBox({ x: width / 2 - 80, y: height / 2, s: 50 }));
}

function draw() {
  background(0);

  dBoxes.forEach((dBox) => {
    dBox.display();
    dBox.drag();
  });
}
