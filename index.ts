import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const benchmarksDir = path.join(__dirname, "suites");

const specificBenchmark = process.argv[2];

fs.readdirSync(benchmarksDir).forEach((file) => {
  if (file.endsWith(".ts")) {
    if (!specificBenchmark || file.startsWith(specificBenchmark)) {
      execSync(`npx ts-node ${path.join(benchmarksDir, file)}`, {
        stdio: "inherit",
      });
      console.log();
    }
  }
});
