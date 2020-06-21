let sources, testParticle, trajectoryTracer, saveButton;

function setup() {
  createCanvas(960, 480);

  addSourceButton = createButton("Add source");
  addSourceButton.mousePressed(handleAddSourcePress);
  addSourceButton.addClass("add-source-button");

  saveButton = createButton("save");
  saveButton.addClass("add-source-button");
  saveButton.mousePressed(handleSaveButtonPress);

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

async function handleSaveButtonPress() {
  const data = {
    sources: getSourcesData(sources.getAllSources()),
    testParticle: getTestParticleData(testParticle),
  };
  const res = await saveSystem({
    data,
  });
  alert(res.id);
}

function draw() {
  background(0);
  sources.display();
  testParticle.display();
  trajectoryTracer.trace();
}

function keyPressed(e) {
  if (e.key === "Delete") {
    sources.deleteCurrentlySelected();
  }
}

////////////////////////////////////////////
/////// Fns to export data ////////////////
//////////////////////////////////////////

const getSourcesData = (sources) => {
  const data = sources.map((source) => ({
    size: source.getSize(),
    pos: source.getPos(),
  }));
  return data;
};

const getTestParticleData = (testParticle) => {
  return {
    pos: testParticle.getPos(),
    vel: testParticle.getVel(),
  };
};
