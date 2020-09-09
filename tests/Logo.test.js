import 'regenerator-runtime/runtime';
import puppeteer from 'puppeteer';

/**
 * Define browser and page variables outside of the beforeEach
 * statement to make sure they are accessible inside the tests.
 */
let browser, page;
const baseUrl = 'http://localhost:3000';

beforeEach(async () => {
  // Create new brower window and a new page.
  browser = await puppeteer.launch({});
  page = await browser.newPage();

  // Navigate to the app path.
  await page.goto(baseUrl);
});

// Close the browser window after the test.
afterEach(async () => {
  await browser.close();
});

/**
 * Test suites.
 */
test('renders the logo', async () => {
  // Use the DOM selector to select the targeted item.
  const logoText = await page.$eval(
    '#root > header > div > h1 > a',
    element => element.innerHTML
  );

  // Make an assertion.
  expect(logoText).toEqual('Lost in a Postcard');
});

test('"/login" route renders the login form', async () => {
  // Navigate to /login.
  await page.goto(baseUrl + '/login');

  // Pull out input placeholders/
  const loginInputPlaceholder = await page.$eval(
    '#root > main > form > input[type=text]:nth-child(1)',
    element => element.placeholder
  );

  const passwordInputPlaceholder = await page.$eval(
    '#root > main > form > input[type=password]:nth-child(2)',
    element => element.placeholder
  );

  // Make assertions.
  expect(loginInputPlaceholder).toEqual('Login');
  expect(passwordInputPlaceholder).toEqual('Password');
});
