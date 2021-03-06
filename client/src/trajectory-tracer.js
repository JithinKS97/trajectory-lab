class TrajectoryTracer {
  constructor({ testP, sources }) {
    // testP is test particle
    this.testP = testP;

    // Sources of force
    this.sources = sources;
  }

  trace() {
    // position and size of all the sources. Is of the form [{ size, pos }]
    this.sourcesPS = getPosSize(this.sources);

    // position, velicity and size of test particle. Is of the form { pos, vel, size }
    this.testPVS = getPosVelSize(this.testP);

    // To draw the trajectory, we need current pos, size and vel of test particle
    // And real time pos and size of all the sources. We assume that sources are static
    this.drawTrajectory(this.sourcesPS, this.testPVS);
  }

  drawTrajectory(sourcesPS, testPVS) {
    const testPPosVelSize = {
      pos: createVector(...testPVS.pos),
      size: testPVS.size,
      vel: createVector(...testPVS.vel),
    };
    doNumericalIntegration(sourcesPS, testPPosVelSize);
  }
}

let dt;
// Gravitational constant
let G = 2000;

// No of projection points
let noOfPoints = 20000;
let DELTA_X = 0.1;
let markInterval = 50;

const doNumericalIntegration = (sourcesPS, testPVS) => {
  for (let i = 0; i < noOfPoints; i += 1) {
    const prevPos = createVector(testPVS.pos.x, testPVS.pos.y);

    const forceOnTP = getTotalForceOnTP(sourcesPS, testPVS);
    const acc = forceOnTP.mult(1 / testPVS.size);

    let dv = createVector(acc.x, acc.y).mult(dt || 0.1);

    const vel = testPVS.vel.add(dv);

    /**
     * To make dx always equal to DELTA_X
     *
     * dx/dt = v
     *
     * dx = DELTA_X
     * dt = DELTA_X/v
     */

    dt = DELTA_X / vel.mag();

    let dx = createVector(vel.x, vel.y).mult(dt);

    const pos = testPVS.pos.add(dx);

    strokeWeight(2);

    if (i % markInterval === 0) {
      push();
      stroke(255, 255, 255, map(i, 0, noOfPoints, 255, 0));
      line(prevPos.x, prevPos.y, pos.x, pos.y);
      pop();
    }

    testPVS.vel = vel;
    testPVS.pos = pos;
  }
};

const getTotalForceOnTP = (sourcesPS, testPS) => {
  return sourcesPS.reduce(addForce(testPS), createVector());
};

const addForce = (testPS) => {
  return (totalForce, sourcePS) => {
    testPPos = createVector(testPS.pos.x, testPS.pos.y);
    testPSize = testPS.size;

    sourcePos = createVector(...sourcePS.pos);
    sourceSize = sourcePS.size;

    const disp = p5.Vector.sub(sourcePos, testPPos);

    // Line of action
    // line(testPPos.x, testPPos.y, testPPos.x + disp.x, testPPos.y + disp.y);

    const dispMag = disp.mag();

    // G*m1*m2/r2

    let forceMag;

    if (dispMag != 0) {
      forceMag = G * testPS.size * sourcePS.size * (1 / (dispMag * dispMag));
    } else {
      return totalForce;
    }

    const force = disp.normalize().mult(forceMag);

    return totalForce.add(force);
  };
};

const getPosSize = (sources) => {
  return sources.map((source) => {
    return {
      size: source.getSize(),
      pos: source.getPos(),
    };
  });
};

const getPosVelSize = (testP) => {
  return {
    pos: testP.getPos(),
    vel: testP.getVel(),
    size: testP.getSize(),
  };
};
