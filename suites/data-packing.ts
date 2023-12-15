import benny from "benny";
import { Vector3SoARepresentation } from "./util/objects";

const COUNT = 200;
const ITERATIONS = 100;
const WARMUP_ITERATIONS = 1;

benny.suite(
  "Data packing strategies",

  benny.add("F64: Separate Arrays", () => {
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

  benny.add("F64: Packed Contiguous Array", () => {
    // Setup
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

  benny.add("F64: Packed Vector Array", () => {
    // Setup
    const vector3 = new Float64Array(COUNT * 3).fill(1);

    function test(vector3: Float64Array) {
      for (let i = 0; i < COUNT; i++) {
        vector3[i * 3] += 2;
        vector3[i * 3 + 1] -= 2;
        vector3[i * 3 + 2] *= 2;
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

  benny.add("F32: Separate Arrays", () => {
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

  benny.add("F32: Packed Contiguous Array", () => {
    // Setup
    const buffer = new Float32Array(COUNT * 3).fill(1);
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

  benny.add("F32: Packed Vector Array", () => {
    // Setup
    const vector3 = new Float32Array(COUNT * 3).fill(1);

    function test(vector3: Float32Array) {
      for (let i = 0; i < COUNT; i++) {
        vector3[i * 3] += 2;
        vector3[i * 3 + 1] -= 2;
        vector3[i * 3 + 2] *= 2;
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

  benny.cycle(),
  benny.complete(),
  benny.save({ file: "reduce", version: "1.0.0" }),
  benny.save({ file: "reduce", format: "chart.html" })
);
