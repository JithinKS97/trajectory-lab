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
  const system = {
    sources: getSourcesData(sources.getAllSources()),
    testParticle: getTestParticleData(testParticle),
  };
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  alert(`${url}#${id}`);

  saveSystem({
    id,
    system,
  });
}

function loadData(id) {
  const canvasNode = document.querySelector(".p5Canvas");
  canvasNode.style.display = "none";
  const loadingNode = document.createElement("p");
  loadingNode.innerHTML = "Loading...";
  document.body.appendChild(loadingNode);
  loadSystem(id).then((res) => {
    document.body.removeChild(loadingNode);
    canvasNode.style.display = "block";
    restoreSystem(res);
  });
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
