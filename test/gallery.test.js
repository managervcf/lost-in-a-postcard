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
it('renders the gallery description', async () => {
  /**
   * 1. Navigate to /photos/featured.
   * 2. Define a selector.
   * 3. Define tries and galleryDescText variables.
   * 4. Try to pull off the galleryDescText while tries are less
   *    than n and the galleryDescText is still empty. If failed
   *    reload the page.
   * 5. Make assertions.
   */
  await page.goTo();

  const galleryDescSelector = '#root > main > article > div > section';

  const galleryDescText = await page.tryNTimes(
    async () => await page.getContentsOf(galleryDescSelector)
  );

  expect(galleryDescText).toMatch(/portfolio/i);
});
