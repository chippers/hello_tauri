const os = require("os");
const path = require("path");
const { spawn, spawnSync } = require("child_process");
const { Builder, By, Capabilities } = require("selenium-webdriver");

// create the path to the expected application binary
const application = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "target",
  "release",
  "hello_tauri"
);

// keep track of the webdriver instance we create
let driver;

// keep track of the tauri-driver process we start
let tauriDriver;

before(async () => {
  // ensure the program has been built
  spawnSync("cargo", ["build", "--release"]);

  // start tauri-driver
  tauriDriver = spawn(
    path.resolve(os.homedir(), ".cargo", "bin", "tauri-driver"),
    [],
    { stdio: [null, process.stdout, process.stderr] }
  );

  const capabilities = new Capabilities();
  capabilities.set("tauri:options", { application });
  capabilities.setBrowserName("tauri");

  // start the webdriver client
  driver = await new Builder()
    .withCapabilities(capabilities)
    .usingServer("http://localhost:4444/")
    .build();
});

after(async () => {
  // kill the tauri-driver process
  tauriDriver.kill();

  // stop the webdriver session
  await driver.quit();
});

describe("Hello Tauri", () => {
  it("should be cordial", async () => {
    const text = await driver.findElement(By.css("body > h1")).getText();
    expect(text).toMatch(/^[hH]ello/);
  });

  it("should be excited", async () => {
    const text = await driver.findElement(By.css("body > h1")).getText();
    expect(text).toMatch(/!$/);
  });
});
