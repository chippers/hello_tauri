# Hello Tauri WebDriver tests with [Jest] [![WebDriver](https://github.com/chippers/hello_tauri/actions/workflows/webdriver.yml/badge.svg)](https://github.com/chippers/hello_tauri/actions/workflows/webdriver.yml)

This example uses [Jest] as the test runner, and the npm package [`webdriverio`] as the WebDriver
client. This example is purposefully as "dumb" as possible, and starts a new connection for every
test. Because there can only be a single instance running at a time, it needs to be used with the
`--runInBand` cli option. Run with `yarn test`.

[Jest]: https://jestjs.io/
[`webdriverio`]: https://www.npmjs.com/package/webdriverio