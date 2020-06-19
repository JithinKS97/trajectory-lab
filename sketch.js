let src;

function setup() {
  createCanvas(400, 400);
  src = new Source({
    x: width / 2,
    y: height / 2,
    s: 100,
  });
}

function draw() {
  background(0);
  src.display();
}

function mousePressed() {
  console.log(src);
}
