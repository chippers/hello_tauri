const os = require("os");
const path = require("path");
const { luma } = require("../helper");
const browser = require("./hello_tauri");
const { spawn, spawnSync } = require("child_process");

// keep track of the tauri-driver process that we start in beforeAll
let tauriDriver;

// compile the rust project and start the `tauri-driver` process
beforeAll(() => {
  spawnSync("cargo", ["build", "--release"]);

  tauriDriver = spawn(
    path.resolve(os.homedir(), ".cargo", "bin", "tauri-driver"),
    [],
    { stdio: [null, process.stdout, process.stderr] }
  );
});

// clean up the `tauri-driver` process we started
afterAll(() => tauriDriver.kill());

test("we are cordial", async () => {
  await browser(async (browser) => {
    const header = await browser.$("body > h1");
    const text = await header.getText();
    return () => expect(text).toMatch(/^[hH]ello/);
  });
});

test("we are excited", async () => {
  await browser(async (browser) => {
    const header = await browser.$("body > h1");
    const text = await header.getText();
    return () => expect(text).toMatch(/!$/);
  });
});

test("we are easy on the eyes", async () => {
  await browser(async (browser) => {
    const body = await browser.$("body");
    const backgroundColor = await body.getCSSProperty("background-color");
    return () => expect(luma(backgroundColor.parsed.hex)).toBeLessThan(100);
  });
});
