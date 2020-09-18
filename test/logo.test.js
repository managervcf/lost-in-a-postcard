import { CustomPage } from './helpers/page';

/**
 * Define page variable in the global scope
 * to make it accessible inside the tests.
 * @beforeEach - Open the browser and create
 *               a new tab inside chromium.
 * @afterEach - Close the browser.
 */
let page;

beforeEach(async () => {
  page = await CustomPage.build();
});

afterEach(async () => {
  await page.close();
});

/**
 * Test suites.
 */
it('renders the logo', async () => {
  /**
   * 1. Navigate to /.
   * 2. Pull off contents of the selector.
   * 3. Make assertions.
   */
  await page.goTo();
  const logoText = await page.getContentsOf('header > div > h1 > a');
  expect(logoText).toMatch(/lost in a postcard/i);
});
