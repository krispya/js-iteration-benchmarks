import { IsoBench } from "iso-bench";
import {
  Vector3,
  Vector3SoAInterface,
  Vector3SoAReader,
  Vector3SoARepresentation,
  Vector3SoAWithReadWrite,
  Vector3WithGetSet,
} from "./util/objects";

// Some Notes:
// In order for a fair benchmark, all test functions need to have monomorphic arguments so that V8 can optimize them.
// This is why all test functions are defined inside the benchmark function.
// We also do a warmup to allow for V8 to optimize the code before we start measuring.

const COUNT = 500;
const ITERATIONS = 2;

const bench = new IsoBench("Iteration strategies");

bench.add("SoA: Array", () => {
  // Setup
  const vector3 = {
    x: new Array(COUNT).fill(1),
    y: new Array(COUNT).fill(1),
    z: new Array(COUNT).fill(1),
  };

  function test(vector3: Vector3SoARepresentation) {
    for (let i = 0; i < vector3.x.length; i++) {
      vector3.x[i] += 2;
      vector3.y[i] -= 2;
      vector3.z[i] *= 2;
    }
  }

  return () => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vector3);
    }
  };
});

bench.add("SoA: Float64Array", () => {
  // Setup
  const vector3 = {
    x: new Float64Array(COUNT).fill(1),
    y: new Float64Array(COUNT).fill(1),
    z: new Float64Array(COUNT).fill(1),
  };

  function test(vector3: Vector3SoARepresentation) {
    for (let i = 0; i < vector3.x.length; i++) {
      vector3.x[i] += 2;
      vector3.y[i] -= 2;
      vector3.z[i] *= 2;
    }
  }

  return () => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vector3);
    }
  };
});

bench.add("SoA: Float32Array", () => {
  // Setup
  const vector3 = {
    x: new Float32Array(COUNT).fill(1),
    y: new Float32Array(COUNT).fill(1),
    z: new Float32Array(COUNT).fill(1),
  };

  function test(vector3: Vector3SoARepresentation) {
    for (let i = 0; i < vector3.x.length; i++) {
      vector3.x[i] += 2;
      vector3.y[i] -= 2;
      vector3.z[i] *= 2;
    }
  }

  return () => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vector3);
    }
  };
});

bench.add("SoA: F32 with accessors", () => {
  // Setup
  const vector3 = {
    x: new Float32Array(COUNT).fill(1),
    y: new Float32Array(COUNT).fill(1),
    z: new Float32Array(COUNT).fill(1),
  };

  const reader = new Vector3SoAReader(vector3, 0);

  function test(reader: Vector3SoAReader) {
    for (let i = 0; i < reader.store.x.length; i++) {
      reader.index = i;
      reader.x += 2;
      reader.y -= 2;
      reader.z *= 2;
    }
  }

  return () => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(reader);
    }
  };
});

bench.add("SoA: F32 with read/write interface", () => {
  // Setup
  const vector3 = {
    x: new Float32Array(COUNT).fill(1),
    y: new Float32Array(COUNT).fill(1),
    z: new Float32Array(COUNT).fill(1),
  };

  const vecInterface = new Vector3SoAInterface(vector3);

  function test(vecInterface: Vector3SoAInterface) {
    for (let i = 0; i < COUNT; i++) {
      vecInterface.x.write(i, vecInterface.x.read(i) + 2);
      vecInterface.y.write(i, vecInterface.y.read(i) - 2);
      vecInterface.z.write(i, vecInterface.z.read(i) * 2);
    }
  }

  return () => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vecInterface);
    }
  };
});

bench.add("SoA: F32 with read/write index interface", () => {
  // Setup
  function test() {
    for (let i = 0; i < COUNT; i++) {
      const { x, y, z } = Vector3SoAWithReadWrite.getBuffers(i);
      x.write(x.read() + 2);
      y.write(y.read() - 2);
      z.write(z.read() * 2);
    }
  }

  return () => {
    for (let i = 0; i < ITERATIONS; i++) {
      test();
    }
  };
});

bench.add("AoS: Class instances", () => {
  // Setup
  const array = new Array(COUNT).fill(0).map(() => new Vector3(1, 1, 1));

  function test(array: Vector3[]) {
    for (let i = 0; i < array.length; i++) {
      array[i].x += 2;
      array[i].y -= 2;
      array[i].z *= 2;
    }
  }

  return () => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(array);
    }
  };
});

bench.add("AoS: With accessors", () => {
  // Setup
  const array = new Array(COUNT)
    .fill(0)
    .map(() => new Vector3WithGetSet(1, 1, 1));

  function test(array: Vector3[]) {
    for (let i = 0; i < array.length; i++) {
      array[i].x += 2;
      array[i].y -= 2;
      array[i].z *= 2;
    }
  }

  return () => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(array);
    }
  };
});

bench.consoleLog().run();
