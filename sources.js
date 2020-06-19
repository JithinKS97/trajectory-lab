class Sources {
  constructor() {
    this.sources = [];
  }
  add() {
    this.sources.push(
      new Source({
        x: width / 2,
        y: height / 2,
        s: 100,
      })
    );
  }
  display() {
    this.sources.forEach((source) => source.display());
  }
  deleteCurrentlySelected() {
    this.sources.forEach((source, index) => {
      if (source.isSelected()) {
        source.clearEvents();
        this.sources.splice(index, 1);
      }
    });
  }
}
