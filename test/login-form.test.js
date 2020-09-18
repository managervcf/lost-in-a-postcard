import { CustomPage } from './helpers/page';
import { testUser } from './mocks';

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
describe('when navigates to /login', () => {
  /**
   * Define selectors for all tests.
   */
  const loginInputSelector =
    '#root > main > form > input[type=text]:nth-child(1)';
  const passwordInputSelector =
    '#root > main > form > input[type=password]:nth-child(2)';
  const loginButtonSelector = '#root > main > form > div > button:nth-child(1)';

  beforeEach(async () => {
    /**
     * 1. Navigates to /login.
     */
    await page.goTo('/login');
  });

  it('renders the login form', async () => {
    /**
     * 1. Pull out login and password input placeholders.
     * 2. Make assertions.
     */
    const loginText = await page.getPlaceholderOf('input[type=text]');
    const passwordText = await page.getPlaceholderOf('input[type=password]');

    expect(loginText).toMatch(/login/i);
    expect(passwordText).toMatch(/password/i);
  });

  describe('and when tries to login with valid credentials', () => {
    beforeEach(async () => {
      /**
       * 1. Define selectors.
       * 2. Login with valid credentials (using the page.login method).
       */
      await page.login();
    });

    it('renders the dashboard', async () => {
      /**
       * 1. Define selectors.
       * 2. Pull of dashboard contents.
       * 3. Make assertions.
       */
      const dashboardSelector = '.dashboard';
      const dashboardContent = await page.getContentsOf(dashboardSelector);
      expect(dashboardContent).toBeDefined();
    });
  });

  describe('and when tries to login without the password', () => {
    beforeEach(async () => {
      /**
       * 1. Define selectors.
       * 2. Fail to login with invalid credentials (using the page.login method).
       */

      await page.login(testUser.username, '');
    });

    it('returns an error message above the form regarding the empty password', async () => {
      /**
       * 1. Define selectors.
       * 2. Pull of error contents.
       * 3. Make assertions.
       */
      const errorSelector = '#root > main > form > div.error';
      const errorText = await page.getContentsOf(errorSelector);
      expect(errorText).toMatch(/must provide a password/i);
    });
  });

  describe('and when tries to login with an empty form', () => {
    beforeEach(async () => {
      /**
       * 1. Define selectors.
       * 2. Fail to login with invalid credentials (using the page.login method).
       *
       */
      await page.login('', '');
    });

    it('returns an error message above the form regarding the empty username', async () => {
      /**
       * 1. Define selectors.
       * 2. Pull of error contents.
       * 3. Make assertions.
       */
      const errorSelector = '#root > main > form > div.error';
      const errorText = await page.getContentsOf(errorSelector);
      expect(errorText).toMatch(/must provide a username/i);
    });
  });
});
