const path = require("path");
const { remote } = require("webdriverio");

const application = path.resolve(
  __dirname,
  "..",
  "..",
  "target",
  "release",
  "hello_tauri"
);

async function browser(callback) {
  const browser = await remote({
    capabilities: {
      "tauri:options": {
        application,
      },
    },
  });

  const assertions = await callback(browser);
  await browser.closeWindow();
  assertions();
}

module.exports = browser;
