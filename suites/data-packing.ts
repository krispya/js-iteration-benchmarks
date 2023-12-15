import benny from "benny";
import { OperationKey, getOperations } from "./util/operations";

const COUNT = 1000;
const OPERATION: OperationKey = "random";

const ops = getOperations(COUNT, OPERATION);

benny.suite(
  "Data packing strategies",

  benny.add("F64: Separate Arrays", () => {
    const vector3 = {
      x: new Float64Array(COUNT).fill(1),
      y: new Float64Array(COUNT).fill(1),
      z: new Float64Array(COUNT).fill(1),
    };

    return () => {
      for (let i = 0; i < COUNT; i++) {
        vector3.x[i] = ops[i](vector3.x[i]);
        vector3.y[i] = ops[i](vector3.y[i]);
        vector3.z[i] = ops[i](vector3.z[i]);
      }
    };
  }),

  benny.add("F64: Packed Contiguous Array", () => {
    const buffer = new Float64Array(COUNT * 3).fill(1);
    const vector3 = {
      x: buffer.subarray(0, COUNT),
      y: buffer.subarray(COUNT, COUNT * 2),
      z: buffer.subarray(COUNT * 2, COUNT * 3),
    };

    return () => {
      for (let i = 0; i < COUNT; i++) {
        vector3.x[i] = ops[i](vector3.x[i]);
        vector3.y[i] = ops[i](vector3.y[i]);
        vector3.z[i] = ops[i](vector3.z[i]);
      }
    };
  }),

  benny.add("F64: Packed Vector Array", () => {
    const vector3 = new Float64Array(COUNT * 3).fill(1);

    return () => {
      for (let i = 0; i < COUNT; i++) {
        vector3[i * 3] = ops[i](vector3[i * 3]);
        vector3[i * 3 + 1] = ops[i](vector3[i * 3 + 1]);
        vector3[i * 3 + 2] = ops[i](vector3[i * 3 + 2]);
      }
    };
  }),

  benny.add("F32: Separate Arrays", () => {
    const vector3 = {
      x: new Float32Array(COUNT).fill(1),
      y: new Float32Array(COUNT).fill(1),
      z: new Float32Array(COUNT).fill(1),
    };

    return () => {
      for (let i = 0; i < COUNT; i++) {
        vector3.x[i] = ops[i](vector3.x[i]);
        vector3.y[i] = ops[i](vector3.y[i]);
        vector3.z[i] = ops[i](vector3.z[i]);
      }
    };
  }),

  benny.add("F32: Packed Contiguous Array", () => {
    const buffer = new Float32Array(COUNT * 3).fill(1);
    const vector3 = {
      x: buffer.subarray(0, COUNT),
      y: buffer.subarray(COUNT, COUNT * 2),
      z: buffer.subarray(COUNT * 2, COUNT * 3),
    };

    return () => {
      for (let i = 0; i < COUNT; i++) {
        vector3.x[i] = ops[i](vector3.x[i]);
        vector3.y[i] = ops[i](vector3.y[i]);
        vector3.z[i] = ops[i](vector3.z[i]);
      }
    };
  }),

  benny.add("F32: Packed Vector Array", () => {
    const vector3 = new Float32Array(COUNT * 3).fill(1);

    return () => {
      for (let i = 0; i < COUNT; i++) {
        vector3[i * 3] = ops[i](vector3[i * 3]);
        vector3[i * 3 + 1] = ops[i](vector3[i * 3 + 1]);
        vector3[i * 3 + 2] = ops[i](vector3[i * 3 + 2]);
      }
    };
  }),

  benny.cycle(),
  benny.complete(),
  benny.save({ file: "reduce", version: "1.0.0" }),
  benny.save({ file: "reduce", format: "chart.html" })
);
