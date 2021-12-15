import { CustomPage } from './helpers/page';
import { testCountryEdited, testCountry } from './mocks';

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
describe('when logged in and adds a new test photo', () => {
  /**
   * Define all necessary selectors.
   */
  const editCountriesButtonSelector = '#edit-countries-button';
  const navbarListSelector = 'header > nav > ul';
  const errorMessageSelector = '.error-text ';

  beforeEach(async () => {
    /**
     * 1. Log in a test user.
     * 2. Add a test photo.
     */
    await page.login();
    await page.addPhoto();
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

  describe('and when tries to edit the test country with an empty country field', () => {
    beforeEach(async () => {
      await page.editCountry({
        name: '',
        description: testCountryEdited.description,
      });
    });

    it('renders an error message and does not update the test country nav link', async () => {
      /**
       * 1. Define the selector.
       * 2. Pull off navbar and error message contents.
       * 3. Make assertions.
       */

      await page.waitForSelector(errorMessageSelector);

      const errorMessageText = await page.getContentsOf(errorMessageSelector);
      const navbarListContent = await page.getContentsOf(navbarListSelector);

      expect(navbarListContent).not.toMatch(new RegExp(testCountryEdited.name, 'gi'));
      expect(navbarListContent).toMatch(new RegExp(testCountry.name, 'gi'));
      expect(errorMessageText).toMatch(/must provide a country name/i);
    });
  });

  describe('and when tries to edit the test country with an 2 character long country name', () => {
    beforeEach(async () => {
      await page.editCountry({
        name: 'aa',
        description: testCountryEdited.description,
      });
    });

    it('renders an error message and does not update the test country nav link', async () => {
      /**
       * 1. Define the selector.
       * 2. Pull off navbar and error message contents.
       * 3. Make assertions.
       */
      await page.waitForSelector(errorMessageSelector);

      const navbarListContent = await page.getContentsOf(navbarListSelector);
      const errorMessageText = await page.getContentsOf(errorMessageSelector);

      expect(errorMessageText).toMatch(
        /country name must contain at least 3 characters/i
      );
      expect(navbarListContent).not.toMatch(new RegExp(testCountryEdited.name, 'gi'));
      expect(navbarListContent).toMatch(new RegExp(testCountry.name, 'gi'));
    });
  });

  describe('and when tries to edit the test country with valid data', () => {
    beforeEach(async () => {
      /**
       * Edits the test country with valid data.
       */
      await page.editCountry();
    });

    it('renders the edited country name as a nav link', async () => {
      /**
       * 1. Pull off navbar contents.
       * 2. Make assertions.it
       */
      const navbarListContent = await page.getContentsOf(navbarListSelector);
      await page.waitForTimeout(10000);

      expect(navbarListContent).toMatch(new RegExp(testCountryEdited.name, 'gi'));
    });
  });
});
