import benny from "benny";
import {
  Vector3,
  Vector3SoAInterface,
  Vector3SoAReader,
  Vector3SoARepresentation,
  Vector3WithGetSet,
} from "./util/objects";

// Some Notes:
// In order for a fair benchmark, all test functions need to have monomorphic arguments so that V8 can optimize them.
// This is why all test functions are defined inside the benchmark function.
// We also do a warmup to allow for V8 to optimize the code before we start measuring.

const COUNT = 200;
const ITERATIONS = 100;
const WARMUP_ITERATIONS = 1;

benny.suite(
  "Iteration strategies",

  benny.add("SoA: Array", () => {
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

    // Warmup
    for (let i = 0; i < WARMUP_ITERATIONS; i++) {
      test(vector3);
    }

    return () => {
      for (let i = 0; i < ITERATIONS; i++) {
        test(vector3);
      }
    };
  }),

  benny.add("SoA: Float64Array", () => {
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

    // Warmup
    for (let i = 0; i < WARMUP_ITERATIONS; i++) {
      test(vector3);
    }

    return () => {
      for (let i = 0; i < ITERATIONS; i++) {
        test(vector3);
      }
    };
  }),

  benny.add("SoA: Float32Array", () => {
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

    // Warmup
    for (let i = 0; i < WARMUP_ITERATIONS; i++) {
      test(vector3);
    }

    return () => {
      for (let i = 0; i < ITERATIONS; i++) {
        test(vector3);
      }
    };
  }),

  benny.add("SoA with get/set interface", () => {
    // Setup
    const vector3 = {
      x: new Float64Array(COUNT).fill(1),
      y: new Float64Array(COUNT).fill(1),
      z: new Float64Array(COUNT).fill(1),
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

    // Warmup
    for (let i = 0; i < WARMUP_ITERATIONS; i++) {
      test(reader);
    }

    return () => {
      for (let i = 0; i < ITERATIONS; i++) {
        test(reader);
      }
    };
  }),

  benny.add("SoA with read/write interface", () => {
    // Setup
    const vector3 = {
      x: new Float64Array(COUNT).fill(1),
      y: new Float64Array(COUNT).fill(1),
      z: new Float64Array(COUNT).fill(1),
    };

    const vecInterface = new Vector3SoAInterface(vector3);

    function test(vecInterface: Vector3SoAInterface) {
      for (let i = 0; i < COUNT; i++) {
        vecInterface.x.write(i, vecInterface.x.read(i) + 2);
        vecInterface.y.write(i, vecInterface.y.read(i) - 2);
        vecInterface.z.write(i, vecInterface.z.read(i) * 2);
      }
    }

    // Warmup
    for (let i = 0; i < WARMUP_ITERATIONS; i++) {
      test(vecInterface);
    }

    return () => {
      for (let i = 0; i < ITERATIONS; i++) {
        test(vecInterface);
      }
    };
  }),

  benny.add("AoS", () => {
    // Setup
    const array = new Array(COUNT).fill(0).map(() => new Vector3(1, 1, 1));

    function test(array: Vector3[]) {
      for (let i = 0; i < array.length; i++) {
        array[i].x += 2;
        array[i].y -= 2;
        array[i].z *= 2;
      }
    }

    // Warmup
    for (let i = 0; i < WARMUP_ITERATIONS; i++) {
      test(array);
    }

    return () => {
      for (let i = 0; i < ITERATIONS; i++) {
        test(array);
      }
    };
  }),

  benny.add("AoS with getters/setters", () => {
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

    // Warmup
    for (let i = 0; i < WARMUP_ITERATIONS; i++) {
      test(array);
    }

    return () => {
      for (let i = 0; i < ITERATIONS; i++) {
        test(array);
      }
    };
  }),

  benny.add("Map", () => {
    // Setup
    const map = new Map(
      new Array(COUNT).fill(0).map((_, i) => [i, new Vector3(1, 1, 1)])
    );

    function test(map: Map<number, Vector3>) {
      for (let i = 0; i < map.size; i++) {
        const vector = map.get(i)!;
        vector.x += 2;
        vector.y -= 2;
        vector.z *= 2;
      }
    }

    // Warmup
    for (let i = 0; i < WARMUP_ITERATIONS; i++) {
      test(map);
    }

    return () => {
      for (let i = 0; i < ITERATIONS; i++) {
        test(map);
      }
    };
  }),

  benny.cycle(),
  benny.complete(),
  benny.save({ file: "reduce", version: "1.0.0" }),
  benny.save({ file: "reduce", format: "chart.html" })
);
