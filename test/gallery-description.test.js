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
  await page.close();
});

/**
 * Test suites.
 */
it('renders the gallery description', async () => {
  /**
   * 1. Navigate to /photos/featured.
   * 2. Define a selector and wait for it to be loaded.
   * 2. Pull out selectors content.
   * 3. Make assertions.
   */
  await page.goTo('/photos/featured');

  const galleryDescSelector = '#root > main > article > div > section';

  await page.waitFor(galleryDescSelector);
  const galleryDescText = await page.getContentsOf(galleryDescSelector);

  expect(galleryDescText).toMatch(/portfolio/i);
});
