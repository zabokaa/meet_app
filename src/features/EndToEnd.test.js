import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    await page.waitForSelector('.event .details'); // Wait for the details to appear
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    await page.waitForSelector('.event .details', { hidden: true }); // Wait for the details to disappear
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});

describe('Filter events by city.', () => {
  let browser;
  let page;
  let eventListItems;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
    eventListItems = await page.$$('.event');
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
    expect(eventListItems.length).toBeGreaterThan(0);
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'Berlin');
    await page.waitForSelector('.suggestions li'); // Wait for the suggestion list to appear
    const suggestionListItems = await page.$$('.suggestions li');
    expect(suggestionListItems.length).toBeGreaterThan(0);
  });

  test('User can select a city from the suggested list', async () => {
    await page.type('.city', 'Berlin');
    await page.waitForSelector('.suggestions li'); // Wait for the suggestion list to appear
    const suggestionText = await page.$eval('.suggestions li:first-child', (el) => el.textContent);
    await page.click('.suggestions li:first-child');
    const citySearchInputValue = await page.$eval('.city', (el) => el.value);
    expect(citySearchInputValue).toBe(suggestionText);
  });
});

