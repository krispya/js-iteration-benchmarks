import { IsoBench } from "iso-bench";

const COUNT = 1000;

const bench = new IsoBench("Function call strategies", { samples: 20 });

bench.add(
  "Constant argument length",
  ({ test }) => {
    for (let i = 0; i < COUNT; i++) {
      test(i, i, i, i, i);
    }
  },
  () => ({
    test: function test(...args: number[]) {
      let result = 0;
      for (let i = 0; i < args.length; i++) {
        result += args[i];
      }
      return result;
    },
  })
);

bench.add(
  "Variable arguments",
  ({ test }) => {
    // Test calling a function in a loop with 1-5 arguments
    for (let i = 0; i < COUNT; i++) {
      test(i);
      test(i, i);
      test(i, i, i);
      test(i, i, i, i);
      test(i, i, i, i, i);
    }
  },
  () => ({
    test: function test(...args: number[]) {
      let result = 0;
      for (let i = 0; i < args.length; i++) {
        result += args[i];
      }
      return result;
    },
  })
);

bench.add(
  "Array argument var length - created in args",
  ({ test }) => {
    for (let i = 0; i < COUNT; i++) {
      test([i]);
      test([i, i]);
      test([i, i, i]);
      test([i, i, i, i]);
      test([i, i, i, i, i]);
    }
  },
  () => {
    function test(args: number[]) {
      let result = 0;
      for (let i = 0; i < args.length; i++) {
        result += args[i];
      }
      return result;
    }

    return {
      test,
    };
  }
);

bench.add(
  "Array argument var length - preallocated arrays",
  ({ test, args1, args2, args3, args4, args5 }) => {
    for (let i = 0; i < COUNT; i++) {
      test(args1);
      test(args2);
      test(args3);
      test(args4);
      test(args5);
    }
  },
  () => {
    function test(args: number[]) {
      let result = 0;
      for (let i = 0; i < args.length; i++) {
        result += args[i];
      }
      return result;
    }

    return {
      test,
      args1: [1],
      args2: [1, 2],
      args3: [1, 2, 3],
      args4: [1, 2, 3, 4],
      args5: [1, 2, 3, 4, 5],
    };
  }
);

bench.consoleLog().run();
