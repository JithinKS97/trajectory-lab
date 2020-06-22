function restoreSystem({
  sources: loadedSources,
  testParticle: loadedTestParticle,
}) {
  sources.sources = [];
  loadedSources.map((loadedSource) => {
    sources.addViaValues(
      new Source({
        x: loadedSource.pos[0],
        y: loadedSource.pos[1],
        s: loadedSource.size,
        fill: loadedSource.fill,
      })
    );
  });
  testParticle.setPos({
    x: loadedTestParticle.pos[0],
    y: loadedTestParticle.pos[1],
  });
  testParticle.setVel({
    x: loadedTestParticle.vel[0],
    y: loadedTestParticle.vel[1],
  });
  trajectoryTracer.sources = sources.getAllSources();
  trajectoryTracer.testParticle = testParticle;
}
