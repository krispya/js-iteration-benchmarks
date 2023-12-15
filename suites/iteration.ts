import benny from "benny";
import { Vector3, Vector3SoAReader, Vector3WithGetSet } from "./util/objects";
import { OperationKey, getOperations } from "./util/operations";

const COUNT = 1000;
const OPERATION: OperationKey = "random";

const ops = getOperations(COUNT, OPERATION);

benny.suite(
  "Iteration strategies",

  benny.add("SoA: Array", () => {
    const vector3 = {
      x: new Array(COUNT).fill(1),
      y: new Array(COUNT).fill(1),
      z: new Array(COUNT).fill(1),
    };

    return () => {
      for (let i = 0; i < COUNT; i++) {
        vector3.x[i] = ops[i](vector3.x[i]);
        vector3.y[i] = ops[i](vector3.y[i]);
        vector3.z[i] = ops[i](vector3.z[i]);
      }
    };
  }),

  benny.add("SoA: Float64Array", () => {
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

  benny.add("SoA: Float32Array", () => {
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

  benny.add("SoA with object interface", () => {
    const vector3 = {
      x: new Float64Array(COUNT).fill(1),
      y: new Float64Array(COUNT).fill(1),
      z: new Float64Array(COUNT).fill(1),
    };

    const reader = new Vector3SoAReader(vector3, 0);

    return () => {
      for (let i = 0; i < COUNT; i++) {
        reader.index = i;
        reader.x = ops[i](reader.x);
        reader.y = ops[i](reader.y);
        reader.z = ops[i](reader.z);
      }
    };
  }),

  benny.add("AoS", () => {
    const array = Array.from({ length: COUNT }, (_, i) => new Vector3(1, 1, 1));

    return () => {
      for (let i = 0; i < array.length; i++) {
        array[i].x = ops[i](array[i].x);
        array[i].y = ops[i](array[i].y);
        array[i].z = ops[i](array[i].z);
      }
    };
  }),

  benny.add("AoS with getters/setters", () => {
    const array = Array.from(
      { length: COUNT },
      (_, i) => new Vector3WithGetSet(1, 1, 1)
    );

    return () => {
      for (let i = 0; i < array.length; i++) {
        array[i].x = ops[i](array[i].x);
        array[i].y = ops[i](array[i].y);
        array[i].z = ops[i](array[i].z);
      }
    };
  }),

  benny.add("Map", () => {
    const map = new Map(
      Array.from({ length: COUNT }, (_, i) => [i, new Vector3(1, 1, 1)])
    );

    return () => {
      for (let i = 0; i < COUNT; i++) {
        const vector = map.get(i)!;
        vector.x = ops[i](vector.x);
        vector.y = ops[i](vector.y);
        vector.z = ops[i](vector.z);
      }
    };
  }),

  benny.cycle(),
  benny.complete(),
  benny.save({ file: "reduce", version: "1.0.0" }),
  benny.save({ file: "reduce", format: "chart.html" })
);
