import { CustomPage } from './helpers/page';
import { testPhoto } from './mocks';
import { models } from '../server/models';

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
describe('when logged in', () => {
  /**
   * Define all necessary selectors.
   */
  const editCountriesButtonSelector =
    '#root > header > div.dashboard > div:nth-child(3) > button';

  beforeEach(async () => {
    /**
     * Log in a test user.
     */
    await page.login();
  });

  it('renders the edit countries button', async () => {
    /**
     * 1. Pull off contents of the selector.
     * 2. Make assertions.
     */

    const editCountriesButtonContent = await page.getContentsOf(
      editCountriesButtonSelector
    );
    expect(editCountriesButtonContent).toMatch(/edit countries/i);
  });

  describe('and when tries to edit the test country with valid data', () => {
    beforeEach(async () => {
      /**
       * Add editing country logic.
       */
    });

    it.todo('successfully edits the test country');
  });

  describe('and when tries to edit the test country with an empty country field', () => {
    beforeEach(async () => {
      /**
       * Add editing country logic.
       */
    });

    it.todo('renders an error message regarding the country field');
  });
});
