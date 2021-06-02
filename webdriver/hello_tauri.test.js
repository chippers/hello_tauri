const helloTauri = require("./hello_tauri")

test("we are cordial", async () => {
    await helloTauri(async browser => {
        const header = await browser.$("body > h1");
        const text = await header.getText();
        expect(text).toMatch(/^[hH]ello/);
    })
})

test("we are excited", async () => {
    await helloTauri(async browser => {
        const header = await browser.$("body > h1");
        const text = await header.getText();
        expect(text).toMatch(/!$/);
    })
})

test("we are easy on the eyes", async () => {
    await helloTauri(async browser => {
        const body = await browser.$("body");
        const backgroundColor = await body.getCSSProperty("background-color");

        const hex = backgroundColor.parsed.hex.substring(1);
        const rgb = parseInt(hex, 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        expect(luma).toBeLessThan(100);
    })
})
