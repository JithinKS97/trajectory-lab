let sources,
  testParticle,
  trajectoryTracer,
  saveButton,
  idInput,
  loadButton,
  url;

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

  let id = window.location.href.split("#")[1];
  url = window.location.href.split("#")[0];

  if (id) {
    loadData(window.location.href.split("#")[1]);
  }
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
  alert(`${url}#${res.id}`);
}

async function loadData(id) {
  const res = await loadSystem({
    id,
  });
  restoreSystem(res.system.data);
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
    fill: source.getFill(),
  }));
  return data;
};

const getTestParticleData = (testParticle) => {
  return {
    pos: testParticle.getPos(),
    vel: testParticle.getVel(),
  };
};
