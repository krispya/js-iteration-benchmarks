export type OperationKey = "random" | "multiply" | "add" | "subtract";

const operations = [
  (a: number) => a * 2, // Multiplication
  (a: number) => a + 2, // Addition
  (a: number) => a - 2, // Subtraction
  // (a: number) => a / 2, // Division
];

function getOperation(operation: OperationKey) {
  switch (operation) {
    case "random":
      const randomIndex = Math.floor(Math.random() * operations.length);
      return operations[randomIndex];
    case "multiply":
      return operations[0];
    case "add":
      return operations[1];
    case "subtract":
      return operations[2];
    // case "divide":
    //   return operations[3];
  }
}

export function getOperations(count: number, operation: OperationKey) {
  return new Array(count).fill(0).map(() => getOperation(operation));
}
