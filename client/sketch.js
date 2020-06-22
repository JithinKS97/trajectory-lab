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
  addSourceButton.addClass("button");

  saveButton = createButton("save");
  saveButton.addClass("button");
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
    loadData(id);
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

  var id = md5(JSON.stringify(system));

  alert(`${url}#${id}`);

  saveSystem({
    system,
    id,
  });
}

function loadData(id) {
  const { canvasNode, loadingNode } = addLoading();
  loadSystem(id).then((res) => {
    removeLoading(canvasNode, loadingNode);
    restoreSystem(res);
  });
}

const addLoading = () => {
  const canvasNode = document.querySelector(".p5Canvas");
  canvasNode.style.display = "none";
  const loadingNode = document.createElement("p");
  loadingNode.innerHTML = "Loading...";
  document.body.appendChild(loadingNode);
  return { canvasNode, loadingNode };
};

const removeLoading = (canvasNode, loadingNode) => {
  document.body.removeChild(loadingNode);
  canvasNode.style.display = "block";
};

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
