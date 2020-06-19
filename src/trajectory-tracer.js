class TrajectoryTracer {
  constructor({ tp, sources }) {
    this.tp = tp;
    this.sources = sources;
  }

  trace() {
    const mnp = this.getMassAndPosOfAllSources(this.sources);
    const { pos, vel } = this.tp.getPosAndVel();
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
