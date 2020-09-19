import puppeteer from 'puppeteer';
import { testUser, testPhoto } from '../mocks';
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
   * Closes the browser.
   * @returns {Promise<void>}
   */
  async close() {
    await this.browser.close();
  }

  /**
   * Logs in the user.
   * 1. Navigate to '/login'.
   * 2. Define selectors.
   * 3. Type in the mock data.
   * 4. Click the login button.
   * 5. Wait for the logout button to appear
   *    to ensure correct login.
   * @param {{ username: string, password: string }} param0
   * @return {Promise<void>}
   */
  async login({ username, password } = testUser) {
    await this.goTo('/login');
    const loginInputSelector =
      '#root > main > form > input[type=text]:nth-child(1)';
    const passwordInputSelector =
      '#root > main > form > input[type=password]:nth-child(2)';
    const loginButtonSelector =
      '#root > main > form > div > button:nth-child(1)';
    await this.page.type(loginInputSelector, username);
    await this.page.type(passwordInputSelector, password);
    await this.page.click(loginButtonSelector);
    await this.page.waitFor(300);
  }

  /**
   * Logs out the test user.
   * 1. Click on the logout button.
   * 2. Wait for the page UI to update.
   * @returns {Promise<void>}
   */
  async logout() {
    await this.page.click('.logout-button');
    await this.page.waitFor(200);
  }

  /**
   * Attempts to add a new photo.
   * 1. Define selectors.
   * 2. Wait for the add photo button to appear.
   * 3. Clicks on the button to open the new form.
   * 4. Creates an element handle for the file input.
   * 5. Enters provided data and uploads the file.
   * 6. Submits the new photo form.
   * 7. If valid data was provided, waits for the asset
   *    to be uploaded and the records to be saved in
   *    the database.
   * @param {{ file: string, country: string, caption: string, featured: boolean }} photo
   * @return {Promise<void>}
   */
  async addPhoto({ file, country, caption, featured } = testPhoto) {
    const addPhotoSelector = '.dashboard > div:nth-child(2) > button';
    const countryInputSelector =
      '.dashboard > div:nth-child(2) > form > input[type=text]:nth-child(1)';
    const captionInputSelector =
      '.dashboard > div:nth-child(2) > form > input[type=text]:nth-child(2)';
    const featuredCheckboxSelector =
      '.dashboard > div:nth-child(2) > form > div > label > span';
    const fileInputSelector =
      '.dashboard > div:nth-child(2) > form > input[type=file]:nth-child(4)';
    const sendButtonSelector = '.dashboard > div:nth-child(2) > form > button';

    await this.page.waitFor(addPhotoSelector);
    await this.page.click(addPhotoSelector);
    const inputUploadHandle = await this.page.$(fileInputSelector);

    if (country) {
      await this.page.type(countryInputSelector, country);
    }
    if (caption) {
      await this.page.type(captionInputSelector, caption);
    }
    if (featured) {
      await this.page.click(featuredCheckboxSelector);
    }
    if (file) {
      await this.page.click(fileInputSelector);
      inputUploadHandle.uploadFile(file);
    }

    await this.page.click(sendButtonSelector);

    if (file && country) {
      await this.page.waitFor(3000);
    }
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
