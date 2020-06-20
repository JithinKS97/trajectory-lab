let sources, testParticle, trajectoryTracer;

function setup() {
  createCanvas(960, 480);

  addSourceButton = createButton("Add source");
  addSourceButton.mousePressed(handleAddSourcePress);
  addSourceButton.addClass("add-source-button");

  sources = new Sources();
  testParticle = new TestParticle();

  trajectoryTracer = new TrajectoryTracer({
    testP: testParticle,
    sources: sources.getAllSources(),
  });
}

function handleAddSourcePress() {
  sources.add();
}

function draw() {
  background(0);
  sources.display();
  testParticle.display();
  trajectoryTracer.trace();
}

function keyPressed(e) {
  console.log(sources);
  if (e.key === "Delete") {
    sources.deleteCurrentlySelected();
  }
}
