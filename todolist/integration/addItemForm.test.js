const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
});

afterAll(async () => {
    await browser.close();
});

describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?onboarding=false&args=&id=todolist-additemform--add-item-form-story&viewMode=story',
            {waitUntil: "networkidle2", timeout: 10000});

        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
