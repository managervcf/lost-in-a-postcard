import { CustomPage } from './helpers/page';
import { testUser, testPhoto } from './mocks';

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
describe('when logged in', () => {
  beforeEach(async () => {
    /**
     * Log in a test user.
     */
    await page.login();
  });

  it('renders the username', async () => {
    /**
     * 1. Define a selector and wait for it to be loaded.
     * 2. Pull out selectors content.
     * 3. Make assertions.
     */

    const spanSelector = 'div.user-info > p > span';

    const dashboardText = await page.getContentsOf(spanSelector);

    expect(dashboardText).toMatch(testUser.username);
  });

  it('renders the logout, add photo and edit countries buttons', async () => {
    /**
     * 1. Define selectors.
     * 2. Pull out selectors content.
     * 3. Make assertions.
     */
    const logoutButtonSelector = '.logout-button';
    const addPhotoButtonSelector =
      '#root > header > div.dashboard > div:nth-child(2) > button';
    const editCountriesButtonSelector =
      '#root > header > div.dashboard > div:nth-child(3) > button';

    const logoutButtonText = await page.getContentsOf(logoutButtonSelector);
    const addPhotoButtonText = await page.getContentsOf(addPhotoButtonSelector);
    const editCountriesButtonText = await page.getContentsOf(
      editCountriesButtonSelector
    );

    expect(logoutButtonText).toMatch(/logout/i);
    expect(addPhotoButtonText).toMatch(/add photo/i);
    expect(editCountriesButtonText).toMatch(/edit countries/i);
  });

  it.skip('logs user out', async () => {
    /**
     * 1. Define the selector and error variables.
     * 2. Click on the logout button to log out the user.
     * 3. Try to get contents of the selector,
     *    if an error is thrown, save it as the error variable.
     * 4. Make assertions. Stringify error object and match it
     *    against the selector.
     */

    let error;
    const logoutButtonSelector = 'button.button.logout-button';

    await page.click(logoutButtonSelector);

    try {
      await page.getContentsOf(logoutButtonSelector);
    } catch (err) {
      error = err;
    }

    expect(error.toString()).toMatch(logoutButtonSelector);
  });

  describe('and when submits a new photo', () => {
    beforeEach(async () => {
      /**
       * 1. Define selectors for the add photo button,
       *    all the inputs, and the send button.
       * 2. Clicks on the button to open the new form.
       * 3. Creates an element handle for the file input.
       * 3. Enters valid data and uploads the file.
       * 4. Submits the new photo.
       * 5. Waits for the asset to be uploaded and
       *    the records to be saved in the database.
       */
      const addPhotoSelector =
        '#root > header > div.dashboard > div:nth-child(2) > button';
      const countryInputSelector =
        '#root > header > div.dashboard > div:nth-child(2) > form > input[type=text]:nth-child(1)';
      const captionInputSelector =
        '#root > header > div.dashboard > div:nth-child(2) > form > input[type=text]:nth-child(2)';
      const featuredCheckboxSelector =
        '#root > header > div.dashboard > div:nth-child(2) > form > div > input[type=checkbox]';
      const fileInputSelector =
        '#root > header > div.dashboard > div:nth-child(2) > form > input[type=file]:nth-child(4)';
      const sendButtonSelector =
        '#root > header > div.dashboard > div:nth-child(2) > form > button';

      await page.click(addPhotoSelector);

      const inputUploadHandle = await page.$(fileInputSelector);

      await page.type(countryInputSelector, testPhoto.country);
      await page.type(captionInputSelector, testPhoto.caption);
      if (testPhoto.featured) {
        await page.click(featuredCheckboxSelector);
      }
      await page.click(fileInputSelector);
      inputUploadHandle.uploadFile(testPhoto.file);

      await page.click(sendButtonSelector);

      await page.waitFor(2000);
    });

    it('renders the new photo', async () => {
      /**
       * 1. Define selectors.
       * 2. Pull out the photo from the database.
       * 3. Check if there is an image in the gallery with
       *    a src attribute including the public_id.
       */
    });
  });

  describe('and when submits an invalid new photo', () => {
    it.todo('shows an error message above the form');
  });
});

describe('when not logged in', () => {
  it('does not show the dashboard', async () => {
    /**
     * 1. Define the selector and error variables.
     * 2. Try to get contents of the selector,
     *    if an error is thrown, save it as the error variable.
     * 3. Make assertions. Stringify error object and match it
     *    against the selector.
     */
    let error = null;
    const dashboardSelector = '#root > header > div.dashboard';

    try {
      await page.getContentsOf(dashboardSelector);
    } catch (err) {
      error = err;
    }

    expect(error.toString()).toMatch(dashboardSelector);
  });
});
