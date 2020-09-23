import puppeteer from 'puppeteer';
import {
  testUser,
  testPhoto,
  testPhotoEdited,
  testCountryEdited,
  testCountry,
} from '../mocks';
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

    await this.waitFor(addPhotoSelector);
    await this.click(addPhotoSelector);
    const inputUploadHandle = await this.$(fileInputSelector);

    if (country) {
      await this.type(countryInputSelector, country);
    }
    if (caption) {
      await this.type(captionInputSelector, caption);
    }
    if (featured) {
      await this.click(featuredCheckboxSelector);
    }
    if (file) {
      await this.click(fileInputSelector);
      inputUploadHandle.uploadFile(file);
    }

    await this.click(sendButtonSelector);
    await this.waitFor(50);

    if (file && country) {
      await this.waitFor(4000);
    }
  }

  /**
   * Edits a photo.
   * 1. Define selectors.
   * 2. Click the PhotoItem component to reveal the the caption.
   * 3. Click the edit photo button to open the form.
   * 4. Enter the updated data.
   * 5. Click the update button.
   * 6. Click the exit editing button.
   */
  async editPhoto({ caption } = testPhotoEdited) {
    const photoItemSelector = 'figure.gallery-item';
    const editPhotoButtonSelector =
      'figure.gallery-item > figcaption > button:nth-child(2)';
    const photoCaptionInputSelector =
      'figure.gallery-item > figcaption > form > input[type=text]:nth-child(2)';
    const updateButtonSelector =
      'figure.gallery-item > figcaption > form > button';

    await this.waitFor(2000);

    await this.click(photoItemSelector, { clickCount: 1, delay: 500 });
    await this.click(editPhotoButtonSelector);
    await this.waitFor(photoCaptionInputSelector);

    await this.click(photoCaptionInputSelector, { clickCount: 3 });
    if (caption) {
      await this.type(photoCaptionInputSelector, caption);
    } else {
      await this.keyboard.press('Backspace');
    }

    await this.click(updateButtonSelector);
    await this.waitFor(300);
  }

  /**
   * Edits a country.
   * 1. Click the edit country button to open the form
   *    and wait for the form to be rendered.
   * 2. Pick a country.
   * 2. Enter an updated data.
   * 3. Click the update button.
   */
  async editCountry(
    { name, description } = testCountryEdited,
    initialCountry = testCountry
  ) {
    const editCountriesButtonSelector =
      '.dashboard > div:nth-child(3) > button';
    const selectMenuSelector = '.dashboard > div:nth-child(3) > form > select';
    const nameInputSelector =
      '.dashboard > div:nth-child(3) > form > input[type=text]';
    const descriptionInputSelector =
      '.dashboard > div:nth-child(3) > form > textarea';
    const updateButtonSelector =
      '.dashboard > div:nth-child(3) > form > button[type=submit]';

    await this.click(editCountriesButtonSelector);
    await this.waitFor(300);

    await this.select(selectMenuSelector, initialCountry.name);

    await this.click(nameInputSelector, { clickCount: 3 });
    if (name) {
      await this.type(nameInputSelector, name);
    } else {
      await this.keyboard.press('Backspace');
    }

    await this.click(descriptionInputSelector, { clickCount: 3 });
    await this.type(descriptionInputSelector, description);

    await this.click(updateButtonSelector);
    await this.waitFor(300);
  }

  /**
   * Gets the contents of the element.
   * @param {String} element
   * @returns {Promise<string>}
   */
  async getContentsOf(selector) {
    return await this.$eval(selector, el => el.innerHTML);
  }

  /**
   * Gets the content of the placeholder.
   * @param {String} selector
   * @returns {Promise<string>}
   */
  async getPlaceholderOf(selector) {
    return await this.$eval(selector, el => el.placeholder);
  }
}
