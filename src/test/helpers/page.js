import puppeteer from 'puppeteer';
import {
  testUser,
  testPhoto,
  testPhotoEdited,
  testCountryEdited,
  testCountry,
  DELETE_PHOTO,
} from '../mocks';
/**
 * Custom Page class using Proxy API to use puppeteer's Page class
 * as well as custom function defined to make tests more readable.
 */
export class CustomPage {
  /**
   * Builds an instance of the CustomPage.
   * @param {boolean} headless
   * @returns {Promise}
   */
  static async build(headless = true) {
    /**
     * 1. Create a Browser instance, passing an options object.
     * 2. Create a Page instance.
     * 3. Create a CustomPage instance.
     * 4. Combine customPage, page and browser and return a proxy.
     */
    const browser = await puppeteer.launch({
      headless,
      args: ['--no-sandbox'],
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
    this.baseUrl =
      process.env.NODE_ENV === 'ci'
        ? `http://localhost:${process.env.PORT}`
        : 'http://localhost:3000';
    this.graphQLEndpoint = `http://localhost:${process.env.PORT}/graphql`;
  }

  /**
   * Navigates to specified, relative path.
   * @param {String} path
   * @returns {Promise<void>}
   */
  async goTo(path = '') {
    await this.goto(this.baseUrl + path, {
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
    const loginInputSelector = '#login-username-input';
    const passwordInputSelector = '#login-password-input';
    const loginButtonSelector = '#login-submit-button';
    await this.type(loginInputSelector, username);
    await this.type(passwordInputSelector, password);
    await this.click(loginButtonSelector);
    await this.waitFor(300);
  }

  /**
   * Logs out the test user.
   * 1. Click on the logout button.
   * 2. Wait for the page UI to update.
   * @returns {Promise<void>}
   */
  async logout() {
    await this.click('#logout-button');
    await this.waitFor(200);
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
    const addPhotoSelector = '#add-photo-button';
    const countryInputSelector = '#add-photo-country-input';
    const captionInputSelector = '#add-photo-caption-input';
    const featuredCheckboxSelector = '#add-photo-featured-input';
    const fileInputSelector = '#add-photo-file-input';
    const sendButtonSelector = '#add-photo-submit-button';

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
      await this.waitFor(5000);
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
    const photoCaptionInputSelector = '#edit-photo-caption-input';
    const updateButtonSelector = '#edit-photo-submit-button';

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
    const editCountriesButtonSelector = '#edit-countries-button';
    const pickedCountrySelector = `#edit-countries > form > div > div > input[value="${initialCountry.name}"] + label`;
    const nameInputSelector = '#edit-country-name-input';
    const descriptionInputSelector = '#edit-country-description-input';
    const updateButtonSelector = `#edit-country-submit-button`;

    await this.click(editCountriesButtonSelector);

    await this.waitFor(pickedCountrySelector);
    await this.click(pickedCountrySelector, { delay: 100 });
    await this.waitFor(300);

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

  /**
   * Executes the native fetch function inside the chromium browser.
   * The function will make a request to the graphQL endpoint calling
   * the evaluate method on the Page class.
   * @param {string} method
   * @param {string} query
   * @param {object} variables
   */
  async fetch(method, query, variables) {
    const callback = (_query, _variables, _method, _endpoint) =>
      fetch(_endpoint, {
        method: _method.toUpperCase(),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: _query, variables: _variables }),
      })
        .then(res => res.json())
        .then(json => json.errors[0].message);

    return await this.evaluate(
      callback,
      query,
      variables,
      method,
      this.graphQLEndpoint
    );
  }
}
