import { CustomPage } from './helpers/page';
import { testUser } from './mocks';

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
it('renders the username', async () => {
  /**
   * 1. Log in a test user.
   * 2. Define a selector and wait for it to be loaded.
   * 2. Pull out selectors content.
   * 3. Make assertions.
   */
  await page.login();

  const spanSelector = 'div.user-info > p > span';

  const dashboardText = await page.getContentsOf(spanSelector);

  expect(dashboardText).toMatch(testUser.username);
});

it('renders the logout, add photo and edit countries buttons', async () => {
  /**
   * 1. Log in a test user.
   * 2. Define selectors.
   * 2. Pull out selectors content.
   * 3. Make assertions.
   */
  await page.login();

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

it.todo(
  'logs user out'
  // , async () => {
  //   /**
  //    * 1. Log in a test user.
  //    * 2. Define a selector and wait for it to be loaded.
  //    * 2. Click on the logout button.
  //    * 3. Make assertions.
  //    */
  //   await page.login();

  //   const logoutButtonSelector =
  //     // '#root > header > div.dashboard > div:nth-child(2) > button';
  //     'button.button.logout-button';

  //   await page.click(logoutButtonSelector, { delay: 300 });

  //   expect(await page.getContentsOf(logoutButtonSelector)).toBeUndefined();
  // }
);
