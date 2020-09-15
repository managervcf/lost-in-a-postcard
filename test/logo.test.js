import { CustomPage } from './helpers/page';

/**
 * Define page variable in the global scope
 * to make it accessible inside the tests.
 */
let page;

beforeEach(async () => {
  page = await CustomPage.build();
});

afterEach(async () => {
  await page.close(false);
});

/**
 * Test suites.
 */
it('renders the logo', async () => {
  /**
   * 1. Navigate to the index page.
   * 2. Pull out logo contents.
   * 3. Make assertions.
   */
  await page.goTo();

  const logoText = await page.getContentsOf('#root > header > div > h1 > a');

  expect(logoText).toMatch(/lost in a postcard/i);
});
