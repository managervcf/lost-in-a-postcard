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
it('renders the login form', async () => {
  /**
   * 1. Navigate to /login.
   * 2. Pull out login and password input placeholders.
   * 3. Make assertions.
   */
  await page.goTo('/login');

  const loginText = await page.getPlaceholderOf('input[type=text]');
  const passwordText = await page.getPlaceholderOf('input[type=password]');

  expect(loginText).toMatch(/login/i);
  expect(passwordText).toMatch(/password/i);
});
