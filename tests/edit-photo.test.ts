import { CustomPage } from './helpers/page';
import { testPhoto, testCountry, testPhotoEdited } from './mocks';

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
describe(`when logged in, adds a new photo and navigates to /photos/${testCountry.name}`, () => {
  /**
   * Define all necessary selectors.
   */
  const editPhotoButtonSelector =
    'figure.gallery-item > figcaption > button:nth-child(2)';

  beforeEach(async () => {
    /**
     * 1. Log in a test user.
     * 2. Adds the test photo.
     * 3. Navigates to the /photo/test-country.
     */
    await page.login();
    await page.addPhoto();
    await page.goTo(`/photos/${testCountry.name}`);
  });

  it('renders the edit button inside the test photo caption', async () => {
    /**
     * 1. Pull off contents of the selector.
     * 2. Make assertions.
     */

    await page.waitForSelector(editPhotoButtonSelector);
    const editPhotoButtonContent = await page.getContentsOf(editPhotoButtonSelector);
    expect(editPhotoButtonContent).toMatch(/edit/i);
  });

  describe('and when tries to edit the test photo with an updated data', () => {
    beforeEach(async () => {
      /**
       * Edit the test photo.
       */
      await page.editPhoto();
    });

    it('renders the test photo caption with an updated data', async () => {
      /**
       * 1. Define selectors.
       * 2. Click the exit editing button to go back to caption.
       * 3. Wait for the caption to be visible.
       * 4. Pull off caption contents.
       * 5. Make assertions.
       */
      const captionSelector =
        'figure.gallery-item > figcaption > section > p.gallery-caption-title';
      const exitEditingButtonSelector =
        'figure.gallery-item > figcaption > button:nth-child(2)';

      await page.click(exitEditingButtonSelector);
      await page.waitForSelector(captionSelector);
      const captionContent = await page.getContentsOf(captionSelector);
      expect(captionContent).toEqual(testPhotoEdited.caption);
      expect(captionContent).not.toEqual(testPhoto.caption);
    });
  });
});
