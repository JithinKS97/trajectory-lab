class TrajectoryTracer {
  constructor({ testP, sources }) {
    this.testP = testP;
    this.sources = sources;
  }

  trace() {
    this.sourcesPS = getPosAndSizeOfAllSources(this.sources);
    this.testPVS = getPVS(this.testP);
  }
}

/////////////////////////////////
////// Helper functions ////////
///////////////////////////////

getPosAndSizeOfAllSources = (sources) => {
  return sources.map((source) => {
    return {
      size: source.getSize(),
      pos: source.getPos(),
    };
  });
};

getPVS = (testP) => {
  return {
    pos: testP.getPos(),
    vel: testP.getVel(),
    size: testP.getSize(),
  };
};
