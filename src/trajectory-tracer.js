class TrajectoryTracer {
  constructor({ testP, sources }) {
    this.testP = testP;
    this.sources = sources;
  }

  trace() {
    const mnp = this.getMassAndPosOfAllSources(this.sources);
    const { pos, vel } = this.testP.getPosAndVel();
  }

  getMassAndPosOfAllSources = (sources) => {
    return sources.map((source) => {
      return {
        s: source.getSize(),
        pos: source.getPos(),
      };
    });
  };
}
