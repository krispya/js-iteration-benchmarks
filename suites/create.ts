import { IsoBench } from "iso-bench";

const COUNT = 10000;

const bench = new IsoBench("Creating primitives", { samples: 20 });

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
  "Number",
  (store) => {
    for (let i = 0; i < COUNT; i++) {
      store[i * 2] = i;
      store[i * 2 + 1] = 0;
    }
  },
  () => new Array(COUNT * 2).fill(null)
);

bench.add(
  "Basic object",
  (store) => {
    for (let i = 0; i < COUNT; i++) {
      store[i] = { id: i, gen: 0 };
    }
  },
  () => new Array(COUNT).fill(null)
);

bench.add(
  "Basic object w/ methods",
  (store) => {
    for (let i = 0; i < COUNT; i++) {
      store[i] = { id: i, gen: 0, method };
    }
  },
  () => new Array(COUNT).fill(null)
);

bench.add(
  "Class instance",
  (store) => {
    for (let i = 0; i < COUNT; i++) {
      store[i] = new Test(i, 0);
    }
  },
  () => new Array(COUNT).fill(null)
);

bench.add(
  "Tuple array",
  (store) => {
    for (let i = 0; i < COUNT; i++) {
      store[i] = [i, 0];
    }
  },
  () => new Array(COUNT).fill(null)
);

bench.consoleLog().run();
