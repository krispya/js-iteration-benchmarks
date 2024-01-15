import { IsoBench } from "iso-bench";
import { Vector3SoARepresentation } from "./util/objects";

const COUNT = 500;
const ITERATIONS = 2;

const bench = new IsoBench("Data packing strategies", { samples: 20 });

bench.add(
  "F64: Separate Arrays",
  ({ test, vector3 }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vector3);
    }
  },
  () => ({
    vector3: {
      x: new Float64Array(COUNT).fill(1),
      y: new Float64Array(COUNT).fill(1),
      z: new Float64Array(COUNT).fill(1),
    },
    test: function test(vector3: Vector3SoARepresentation) {
      for (let i = 0; i < vector3.x.length; i++) {
        vector3.x[i] += 2;
        vector3.y[i] -= 2;
        vector3.z[i] *= 2;
      }
    },
  })
);

bench.add(
  "F64: Packed Contiguous Array",
  ({ test, vector3 }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vector3);
    }
  },
  () => {
    const buffer = new Float64Array(COUNT * 3).fill(1);
    const vector3 = {
      x: buffer.subarray(0, COUNT),
      y: buffer.subarray(COUNT, COUNT * 2),
      z: buffer.subarray(COUNT * 2, COUNT * 3),
    };

    function test(vector3: Vector3SoARepresentation) {
      for (let i = 0; i < vector3.x.length; i++) {
        vector3.x[i] += 2;
        vector3.y[i] -= 2;
        vector3.z[i] *= 2;
      }
    }

    return { vector3, test };
  }
);

bench.add(
  "F64: Packed Vector Array",
  ({ test, vector3 }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vector3);
    }
  },
  () => ({
    vector3: new Float64Array(COUNT * 3).fill(1),
    test: function test(vector3: Float64Array) {
      for (let i = 0; i < COUNT; i++) {
        vector3[i * 3] += 2;
        vector3[i * 3 + 1] -= 2;
        vector3[i * 3 + 2] *= 2;
      }
    },
  })
);

bench.add(
  "F32: Separate Arrays",
  ({ test, vector3 }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vector3);
    }
  },
  () => ({
    vector3: {
      x: new Float32Array(COUNT).fill(1),
      y: new Float32Array(COUNT).fill(1),
      z: new Float32Array(COUNT).fill(1),
    },
    test: function test(vector3: Vector3SoARepresentation) {
      for (let i = 0; i < vector3.x.length; i++) {
        vector3.x[i] += 2;
        vector3.y[i] -= 2;
        vector3.z[i] *= 2;
      }
    },
  })
);

bench.add(
  "F32: Packed Contiguous Array",
  ({ test, vector3 }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vector3);
    }
  },
  () => ({
    vector3: {
      x: new Float32Array(COUNT).fill(1),
      y: new Float32Array(COUNT).fill(1),
      z: new Float32Array(COUNT).fill(1),
    },
    test: function test(vector3: Vector3SoARepresentation) {
      for (let i = 0; i < vector3.x.length; i++) {
        vector3.x[i] += 2;
        vector3.y[i] -= 2;
        vector3.z[i] *= 2;
      }
    },
  })
);

bench.add(
  "F32: Packed Vector Array",
  ({ test, vector3 }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vector3);
    }
  },
  () => ({
    vector3: new Float32Array(COUNT * 3).fill(1),
    test: function test(vector3: Float32Array) {
      for (let i = 0; i < COUNT; i++) {
        vector3[i * 3] += 2;
        vector3[i * 3 + 1] -= 2;
        vector3[i * 3 + 2] *= 2;
      }
    },
  })
);

bench.consoleLog().run();
