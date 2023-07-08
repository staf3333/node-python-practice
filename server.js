const express = require("express");
// this module provides ability to spawn subprocesses
const { spawnSync } = require("child_process");
const { readFile } = require("fs/promises");
const { appendFile } = require("fs/promises");
const { join } = require("path");

const app = express();

// GET request that
app.get("/", async (req, res, next) => {
  // assume X and y are very large arrays (why we would use python in the first place)
  const X = [1, 2, 5];
  const y = [
    [1, 2],
    [2, 3],
    [1, 2],
  ];

  // appendFile thing
  await appendFile(join("scripts/args.json"), JSON.stringify({ X, y }), {
    encoding: "utf-8",
    flag: "w",
  });
  const pythonProcess = await spawnSync("python3", [
    "/Users/shabamus/OneDrive - adidas/Documents/Adilyze/node-python-practice/scripts/python-script.py",
    "first_function",
    "/Users/shabamus/OneDrive - adidas/Documents/Adilyze/node-python-practice/scripts/args.json",
    "/Users/shabamus/OneDrive - adidas/Documents/Adilyze/node-python-practice/scripts/results.json",
  ]);
  const result = pythonProcess.stdout?.toString()?.trim();
  const error = pythonProcess.err?.toString()?.trim();

  const status = result === "OK";
  if (status) {
    const buffer = await readFile(
      "/Users/shabamus/OneDrive - adidas/Documents/Adilyze/node-python-practice/scripts/results.json"
    );
    const resultParsed = JSON.parse(buffer?.toString());
    res.send(resultParsed.toString());
  } else {
    console.log(error);
    res.send(JSON.stringify({ status: 500, message: "Server error" }));
  }
});

// create server on port 8000
const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on PORT ${port}`);
});
