import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const benchmarksDir = path.join(__dirname, "suites");

fs.readdirSync(benchmarksDir).forEach((file) => {
  if (file.endsWith(".ts")) {
    execSync(`npx ts-node ${path.join(benchmarksDir, file)}`, {
      stdio: "inherit",
    });
  }
});
