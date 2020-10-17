import { CustomPage } from './helpers/page';
import { testUser } from './mocks';

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
describe('when logged in', () => {
  beforeEach(async () => {
    /**
     * Log in a test user.
     */
    await page.login();
  });

  it('renders the username', async () => {
    /**
     * 1. Define the selector.
     * 2. Pull out selectors content.
     * 3. Make assertions.
     */

    const spanSelector = '#user-info > p > span';
    const dashboardText = await page.getContentsOf(spanSelector);
    expect(dashboardText).toMatch(testUser.username);
  });

  it('renders the logout, add photo and edit countries buttons', async () => {
    /**
     * 1. Define selectors.
     * 2. Pull out selectors content.
     * 3. Make assertions.
     */
    const logoutButtonSelector = '#logout-button';
    const addPhotoButtonSelector = '#add-photo-button';
    const editCountriesButtonSelector = '#edit-countries-button';

    const logoutButtonText = await page.getContentsOf(logoutButtonSelector);
    const addPhotoButtonText = await page.getContentsOf(addPhotoButtonSelector);
    const editCountriesButtonText = await page.getContentsOf(
      editCountriesButtonSelector
    );

    expect(logoutButtonText).toMatch(/logout/i);
    expect(addPhotoButtonText).toMatch(/add photo/i);
    expect(editCountriesButtonText).toMatch(/edit countries/i);
  });

  it('logs out the user', async () => {
    /**
     * 1. Define the selector and error variables.
     * 2. Click on the logout button to log out the user.
     * 3. Try to get contents of the selector,
     *    if an error is thrown, save it as the error variable.
     * 4. Make assertions. Stringify error object and match it
     *    against the selector.
     */
    const logoutButtonSelector = '#logout-button';
    await page.logout();

    let error = '';
    try {
      await page.getContentsOf(logoutButtonSelector);
    } catch (err) {
      error = err;
    }

    expect(error.toString()).toMatch(logoutButtonSelector);
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
    const dashboardSelector = '.dashboard';

    let error = '';
    try {
      await page.getContentsOf(dashboardSelector);
    } catch (err) {
      error = err;
    }

    expect(error.toString()).toMatch(dashboardSelector);
  });
});
