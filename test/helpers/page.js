import puppeteer from 'puppeteer';
import { tokenFactory } from '../factories/token-factory';
import { userFactory } from '../factories/user-factory';
import { models } from '../../server/models';
import { testUser } from '../mocks';
/**
 * Custom Page class using Proxy API to use puppeteer's Page class
 * as well as custom function defined to make tests more readable.
 */
export class CustomPage {
  /**
   * Builds an instance of the CustomPage.
   * @returns {Promise}
   */
  static async build() {
    /**
     * 1. Create a Browser instance, passing an options object.
     * 2. Create a Page instance.
     * 3. Create a CustomPage instance.
     * 4. Combine customPage, page and browser and return a proxy.
     */
    const browser = await puppeteer.launch({
      // headless: false,
      args: ['--start-maximized'],
    });

    const page = await browser.newPage();

    const customPage = new CustomPage(page, browser);

    return new Proxy(customPage, {
      get: function (target, property) {
        return target[property] || browser[property] || page[property];
      },
    });
  }

  constructor(page, browser) {
    this.page = page;
    this.browser = browser;
    this.baseUrl = 'http://localhost:3000';
  }

  /**
   * Navigates to specified, relative path.
   * @param {String} path
   * @returns {Promise<void>}
   */
  async goTo(path = '') {
    await this.page.goto(this.baseUrl + path, {
      waitUntil: 'load',
    });
  }

  /**
   * Removes the test user from the database
   * and closes the browser.
   * @returns {Promise<void>}
   */
  async close() {
    await models.User.deleteMany({ email: testUser.email });
    await this.browser.close();
  }

  /**
   * Logs in a test user.
   * @returns {Promise<void>}
   */
  async login() {
    /**
     * Logs in a test user.
     * 1. Use the userFactory to create a new user.
     * 2. Use tokenFactory and create a new token.
     * 3. Set the token on the page Headers.
     * 4. Refresh the page.
     * 5. Wait for the logout button to appear.
     */
    const user = await userFactory();
    const token = tokenFactory(user);
    await this.page.setExtraHTTPHeaders({ token });
    await this.goTo('/photos', { waitUntil: 'domcontentloaded' });
  }

  /**
   * Gets the contents of the element.
   * @param {String} element
   * @returns {Promise<string>}
   */
  async getContentsOf(selector) {
    return await this.page.$eval(selector, el => el.innerHTML);
  }

  /**
   * Gets the content of the placeholder.
   * @param {String} selector
   * @returns {Promise<string>}
   */
  async getPlaceholderOf(selector) {
    return await this.page.$eval(selector, el => el.placeholder);
  }
}
