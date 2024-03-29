import { CustomPage } from './helpers/page';
import { testCountry } from './mocks';

/**
 * Define page variable in the global scope
 * to make it accessible inside the tests.
 * @beforeEach - Open the browser and create
 *               a new tab inside chromium.
 * @afterEach - Close the browser.
 */
let page: CustomPage;

beforeEach(async () => {
  page = await CustomPage.build();
});

afterEach(async () => {
  await page.close();
});

/**
 * Test suites.
 */

describe('when logs in and adds a new photo', () => {
  /**
   * Define selectors.
   */
  const heartIconSelector = 'article.gallery > figure:nth-child(2) > div > svg.icon';
  const heartCounterSelector =
    'article.gallery > figure:nth-child(2) > div > div.heart-counter';

  beforeEach(async () => {
    /**
     * 1. Login the test user.
     * 2. Add the test photo.
     */
    await page.login();
    await page.addPhoto();
  });

  it('does not render the heart', async () => {
    /**
     * 1. Define an error object.
     * 2. Try to catch an error pulling off contents of the selector.
     * 3. Make assertions.
     */

    let error: any = {};
    try {
      await page.getContentsOf(heartIconSelector);
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toMatch(new RegExp('.icon', 'gi'));
  });

  describe('and when logs out', () => {
    beforeEach(async () => {
      /**
       * Logout the test user.
       */
      await page.logout();
      await page.goTo(`/photos/${testCountry.name}`);
    });

    it('renders the heart icon and the hear counter at 0', async () => {
      /**
       * 1. Pull off the contents of the selector.
       * 2. Make assertions.
       */
      await page.waitForSelector(heartIconSelector);
      const heartIconContent = await page.getContentsOf(heartIconSelector);
      const heartCounterContent = await page.getContentsOf(heartCounterSelector);
      expect(heartIconContent).toMatch(/icon-heart/gi);
      expect(heartCounterContent).toEqual('0');
    });

    describe('and when the heart is clicked', () => {
      beforeEach(async () => {
        /**
         * 1. Wait for the heart icon to load.
         * 2. Click the heart icon with a delay like a normal user.
         * 3. Wait for the count number to be updated.
         */
        await page.waitForSelector(heartIconSelector);
        await page.waitForTimeout(1000);
        await page.click(heartIconSelector, { delay: 100 });
        await page.waitForTimeout(3000);
      });

      it('increments the heart counter by 1', async () => {
        /**
         * 1. Pull off the contents of the selector.
         */
        const heartCounterContent = await page.getContentsOf(heartCounterSelector);
        expect(heartCounterContent).toEqual('1');
      });
    });
  });
});
