class Sources {
  constructor() {
    this.sources = [];
  }

  add() {
    this.sources.push(getNewSource());
  }

  addViaValues(loadedSource) {
    this.sources.push(loadedSource);
  }

  display() {
    this.sources.forEach((source) => source.display());
  }

  deleteCurrentlySelected() {
    this.sources.forEach(removeIfSelected(this.sources));
  }

  getAllSources = () => {
    return this.sources;
  };
}

//////////////////////////////////
//////// Helpers ////////////////
////////////////////////////////

const removeIfSelected = (sources) => {
  return (source, index) => {
    if (source.isSelected()) {
      source.clearEvents();
      sources.splice(index, 1);
    }
  };
};

const getNewSource = () => {
  return new Source({
    x: 80,
    y: 80,
    s: 100,
    fill: [random(255), random(255), random(255)],
  });
};
