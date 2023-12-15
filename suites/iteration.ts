import benny from "benny";
import { Vector3, Vector3SoAReader, Vector3WithGetSet } from "./util/objects";

const COUNT = 1000;

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
        vector3.x[i] += 2;
        vector3.y[i] -= 2;
        vector3.z[i] *= 2;
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
        vector3.x[i] += 2;
        vector3.y[i] -= 2;
        vector3.z[i] *= 2;
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
        vector3.x[i] += 2;
        vector3.y[i] -= 2;
        vector3.z[i] *= 2;
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
        reader.x += 2;
        reader.y -= 2;
        reader.z *= 2;
      }
    };
  }),

  benny.add("AoS", () => {
    const array = Array.from({ length: COUNT }, (_, i) => new Vector3(1, 1, 1));

    return () => {
      for (let i = 0; i < array.length; i++) {
        array[i].x += 2;
        array[i].y -= 2;
        array[i].z *= 2;
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
        array[i].x += 2;
        array[i].y -= 2;
        array[i].z *= 2;
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
        vector.x += 2;
        vector.y -= 2;
        vector.z *= 2;
      }
    };
  }),

  benny.cycle(),
  benny.complete(),
  benny.save({ file: "reduce", version: "1.0.0" }),
  benny.save({ file: "reduce", format: "chart.html" })
);
