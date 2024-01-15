import { IsoBench } from "iso-bench";

const COUNT = 10000;

const bench = new IsoBench("Write to primitives", { samples: 20 });

function method() {
  return 0;
}

class Test {
  public id: number;
  public gen: number;

  constructor(id: number, gen = 0) {
    this.id = id;
    this.gen = gen;
  }

  method = method;
}

bench.add(
  "Number array",
  (store) => {
    for (let i = 0; i < COUNT; i++) {
      store[i * 2] = i;
      store[i * 2 + 1] = 1;
    }
  },
  () => new Array(COUNT * 2).fill(0)
);

bench.add(
  "Basic object",
  (store) => {
    for (let i = 0; i < COUNT; i++) {
      store[i].id = i;
      store[i].gen = 1;
    }
  },
  () => new Array(COUNT).fill({ id: 0, gen: 0 })
);

bench.add(
  "Basic object w/ methods",
  (store) => {
    for (let i = 0; i < COUNT; i++) {
      store[i].id = i;
      store[i].gen = 1;
    }
  },
  () => new Array(COUNT).fill({ id: 0, gen: 0, method })
);

bench.add(
  "Class instance",
  (store) => {
    for (let i = 0; i < COUNT; i++) {
      store[i].id = i;
      store[i].gen = 1;
    }
  },
  () => new Array(COUNT).fill(new Test(0, 0))
);

bench.add(
  "Tuple array",
  (store) => {
    for (let i = 0; i < COUNT; i++) {
      store[i][0] = i;
      store[i][1] = 1;
    }
  },
  () => new Array(COUNT).fill([0, 0])
);

bench.add(
  "Float32Array",
  (store) => {
    for (let i = 0; i < COUNT; i++) {
      store[i * 2] = i;
      store[i * 2 + 1] = 1;
    }
  },
  () => new Float32Array(COUNT * 2)
);

bench.add(
  "Float64Array",
  (store) => {
    for (let i = 0; i < COUNT; i++) {
      store[i * 2] = i;
      store[i * 2 + 1] = 1;
    }
  },
  () => new Float32Array(COUNT * 2)
);

bench.consoleLog().run();
