import { IsoBench } from "iso-bench";
import {
  Vector3,
  Vector3GetSetInstance,
  Vector3SoAInterface,
  Vector3SoAReader,
  Vector3SoARepresentation,
  Vector3SoAWithReadWrite,
  Vector3WithGetSet,
} from "./util/objects";

const COUNT = 1000;
const ITERATIONS = 2;

const bench = new IsoBench("Iteration strategies", { samples: 20 });

bench.add(
  "SoA: Array contiguous",
  ({ vector3, test }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vector3);
    }
  },
  () => ({
    vector3: {
      x: new Array(COUNT).fill(1),
      y: new Array(COUNT).fill(1),
      z: new Array(COUNT).fill(1),
    },
    test: function test(vector3: Vector3SoARepresentation) {
      for (let i = 0; i < vector3.x.length; i++) {
        vector3.x[i] += 1.345;
        vector3.y[i] -= 1.345;
        vector3.z[i] *= 1.345;
      }
    },
  })
);

bench.add(
  "SoA: Array contiguous with index indirection",
  ({ test }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test();
    }
  },
  () => {
    const vector3 = {
      x: new Array(COUNT).fill(1),
      y: new Array(COUNT).fill(1),
      z: new Array(COUNT).fill(1),
    };

    const indices = new Uint32Array(COUNT).fill(0).map((_, i) => i);

    return {
      test: function test() {
        for (let i = 0; i < vector3.x.length; i++) {
          const index = indices[i];
          vector3.x[index] += 1.345;
          vector3.y[index] -= 1.345;
          vector3.z[index] *= 1.345;
        }
      },
    };
  }
);

bench.add(
  "SoA: Array sparse",
  ({ vector3, test }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vector3);
    }
  },
  () => ({
    vector3: {
      x: new Array(COUNT * 2).fill(1),
      y: new Array(COUNT * 2).fill(1),
      z: new Array(COUNT * 2).fill(1),
    },
    test: function test(vector3: Vector3SoARepresentation) {
      for (let i = 0; i < COUNT * 2; i += 2) {
        vector3.x[i] += 1.345;
        vector3.y[i] -= 1.345;
        vector3.z[i] *= 1.345;
      }
    },
  })
);

bench.add(
  "SoA: Float64Array",
  ({ vector3, test }) => {
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
        vector3.x[i] += 1.345;
        vector3.y[i] -= 1.345;
        vector3.z[i] *= 1.345;
      }
    },
  })
);

bench.add(
  "SoA: Float64Array + index indirection",
  ({ test }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test();
    }
  },
  () => {
    const vector3 = {
      x: new Float64Array(COUNT).fill(1),
      y: new Float64Array(COUNT).fill(1),
      z: new Float64Array(COUNT).fill(1),
    };

    const indices = new Uint32Array(COUNT).fill(0).map((_, i) => i);

    return {
      test: function test() {
        for (let i = 0; i < vector3.x.length; i++) {
          const index = indices[i];
          vector3.x[index] += 1.345;
          vector3.y[index] -= 1.345;
          vector3.z[index] *= 1.345;
        }
      },
    };
  }
);

bench.add(
  "SoA: Float32Array",
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
        vector3.x[i] += 1.345;
        vector3.y[i] -= 1.345;
        vector3.z[i] *= 1.345;
      }
    },
  })
);

bench.add(
  "SoA: F64 with accessors",
  ({ reader, test }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(reader);
    }
  },
  () => {
    const vector3 = {
      x: new Float64Array(COUNT).fill(1),
      y: new Float64Array(COUNT).fill(1),
      z: new Float64Array(COUNT).fill(1),
    };

    const reader = new Vector3SoAReader(vector3, 0);

    function test(reader: Vector3SoAReader) {
      for (let i = 0; i < reader.store.x.length; i++) {
        reader.index = i;
        reader.x += 1.345;
        reader.y -= 1.345;
        reader.z *= 1.345;
      }
    }

    return { reader, test };
  }
);

bench.add(
  "SoA: F64 with read/write interface",
  ({ vecInterface, test }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(vecInterface);
    }
  },
  () => {
    const vector3 = {
      x: new Float64Array(COUNT).fill(1),
      y: new Float64Array(COUNT).fill(1),
      z: new Float64Array(COUNT).fill(1),
    };

    const vecInterface = new Vector3SoAInterface(vector3);

    function test(vecInterface: Vector3SoAInterface) {
      for (let i = 0; i < COUNT; i++) {
        vecInterface.x.write(i, vecInterface.x.read(i) + 1.345);
        vecInterface.y.write(i, vecInterface.y.read(i) - 1.345);
        vecInterface.z.write(i, vecInterface.z.read(i) * 1.345);
      }
    }

    return { vecInterface, test };
  }
);

bench.add(
  "SoA: F64 with read/write index interface",
  ({ test }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test();
    }
  },
  () => ({
    test: function test() {
      for (let i = 0; i < COUNT; i++) {
        const { x, y, z } = Vector3SoAWithReadWrite.getBuffers(i);
        x.write(x.read() + 1.345);
        y.write(y.read() - 1.345);
        z.write(z.read() * 1.345);
      }
    },
  })
);

bench.add(
  "AoS: Class instances",
  ({ array, test }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(array);
    }
  },
  () => ({
    array: new Array(COUNT).fill(0).map(() => new Vector3(1, 1, 1)),
    test: function test(array: Vector3[]) {
      for (let i = 0; i < array.length; i++) {
        array[i].x += 1.345;
        array[i].y -= 1.345;
        array[i].z *= 1.345;
      }
    },
  })
);

bench.add(
  "AoS: With accessors",
  ({ array, test }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(array);
    }
  },
  () => ({
    array: new Array(COUNT).fill(0).map(() => new Vector3WithGetSet(1, 1, 1)),
    test: function test(array: Vector3[]) {
      for (let i = 0; i < array.length; i++) {
        array[i].x += 1.345;
        array[i].y -= 1.345;
        array[i].z *= 1.345;
      }
    },
  })
);

bench.add(
  "AoS: With instance proxied by accessors",
  ({ array, test }) => {
    for (let i = 0; i < ITERATIONS; i++) {
      test(array);
    }
  },
  () => ({
    array: new Array(COUNT)
      .fill(0)
      .map(() => new Vector3GetSetInstance(1, 1, 1)),
    test: function test(array: Vector3GetSetInstance[]) {
      for (let i = 0; i < array.length; i++) {
        array[i].x += 1.345;
        array[i].y -= 1.345;
        array[i].z *= 1.345;
      }
    },
  })
);

bench.consoleLog().run();
