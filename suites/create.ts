import { IsoBench } from "iso-bench";

const COUNT = 10000;

const bench = new IsoBench("Creating primitives");

bench.add("Number", () => {
  const store = new Array(COUNT).fill(0);

  return () => {
    for (let i = 0; i < COUNT; i++) {
      store[i] = i;
    }
  };
});

bench.add("Basic object", () => {
  const store = new Array(COUNT).fill(null);

  return () => {
    for (let i = 0; i < COUNT; i++) {
      store[i] = { id: i };
    }
  };
});

bench.add("Class instance", () => {
  class Test {
    public id: number;

    constructor(id: number) {
      this.id = id;
    }
  }

  const store = new Array(COUNT).fill(null);

  return () => {
    for (let i = 0; i < COUNT; i++) {
      store[i] = new Test(i);
    }
  };
});

bench.consoleLog().run();
