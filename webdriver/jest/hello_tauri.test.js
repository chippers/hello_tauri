const os = require("os");
const path = require("path");
const browser = require("./hello_tauri");
const { spawn } = require("child_process");

let driverProcess;
afterAll(() => driverProcess.kill());
beforeAll(() => {
  driverProcess = spawn(
    path.resolve(os.homedir(), ".cargo", "bin", "tauri-driver"),
    [],
    { stdio: [null, process.stdout, process.stderr] }
  );
});

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

    const hex = backgroundColor.parsed.hex.substring(1);
    const rgb = parseInt(hex, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return () => expect(luma).toBeLessThan(100);
  });
});
