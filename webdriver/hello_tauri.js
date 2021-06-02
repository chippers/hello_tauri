const path = require("path");
const {remote} = require('webdriverio');

const application = path.resolve(__dirname, "..", "target", "release", "hello_tauri");

async function helloTauri(callback) {
    const browser = await remote({
        capabilities: {
            "tauri:options": {
                application
            }
        }
    });

    await callback(browser);
    await browser.closeWindow();
}

module.exports = helloTauri;