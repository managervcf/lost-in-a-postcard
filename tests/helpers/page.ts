import puppeteer, { Browser, Page } from 'puppeteer';
import { config } from '../../src/server/config';
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
  // Use a wildcard property to work easily with a Proxy.
  [key: string]: any;

  baseUrl =
    config.nodeEnv === 'ci' ? `http://localhost:${config.port}` : 'http://localhost:3000';
  graphQLEndpoint = `http://localhost:${config.port}/graphql`;

  /**
   * Builds an instance of the CustomPage.
   */
  static async build(headless = false) {
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
      get: function (target, property: keyof CustomPage & symbol) {
        if (property in target) {
          return target[property];
        } else if (property in browser) {
          return browser[property as keyof Browser];
        } else if (property in page) {
          return page[property as keyof Page];
        }
        return target[property];
      },
    });
  }

  constructor(public page: Page, public browser: Browser) {}

  /**
   * Navigates to specified, relative path.
   */
  async goTo(path = '') {
    await this.goto(this.baseUrl + path, {
      waitUntil: 'load',
    });
  }

  /**
   * Logs in the user.
   * 1. Navigate to '/login'.
   * 2. Define selectors.
   * 3. Type in the mock data.
   * 4. Click the login button.
   * 5. Wait for the logout button to appear
   *    to ensure correct login.
   */
  async login({ username, password }: { username: string; password: string } = testUser) {
    await this.goTo('/login');
    const loginInputSelector = '#login-username-input';
    const passwordInputSelector = '#login-password-input';
    const loginButtonSelector = '#login-submit-button';
    await this.type(loginInputSelector, username);
    await this.type(passwordInputSelector, password);
    await this.click(loginButtonSelector);
    await this.waitForTimeout(300);
  }

  /**
   * Logs out the test user.
   * 1. Click on the logout button.
   * 2. Wait for the page UI to update.
   */
  async logout() {
    await this.waitForTimeout(2000);
    await this.click('#logout-button');
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
   */
  async addPhoto({
    file,
    country,
    caption,
    featured,
  }: {
    file: string;
    country: string;
    caption?: string;
    featured?: boolean;
  } = testPhoto) {
    const addPhotoSelector = '#add-photo-button';
    const countryInputSelector = '#add-photo-country-input';
    const captionInputSelector = '#add-photo-caption-input';
    const featuredCheckboxSelector = '#add-photo-featured-input';
    const fileInputSelector = '#add-photo-file-input';
    const sendButtonSelector = '#add-photo-submit-button';
    const closeModalButtonSelector = 'button.modal-dialog-close-button';

    await this.waitForSelector(addPhotoSelector);
    await this.click(addPhotoSelector);
    await this.waitForTimeout(300);
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
    await this.waitForTimeout(50);

    if (file && country) {
      await this.waitForTimeout(5000);
    }

    await this.click(closeModalButtonSelector);
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

    await this.waitForTimeout(2000);

    await this.click(photoItemSelector, { clickCount: 1, delay: 500 });
    await this.click(editPhotoButtonSelector);
    await this.waitForSelector(photoCaptionInputSelector);

    await this.click(photoCaptionInputSelector, { clickCount: 3 });
    if (caption) {
      await this.type(photoCaptionInputSelector, caption);
    } else {
      await this.keyboard.press('Backspace');
    }

    await this.click(updateButtonSelector);
    await this.waitForTimeout(300);
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
    const pickedCountrySelector = `#edit-countries-form > div > div > input[value="${initialCountry.name}"] + label`;
    const nameInputSelector = '#edit-country-name-input';
    const descriptionInputSelector = '#edit-country-description-input';
    const updateButtonSelector = `#edit-country-submit-button`;
    const closeModalButtonSelector = 'button.modal-dialog-close-button';

    await this.waitForTimeout(1000);
    await this.click(editCountriesButtonSelector, { delay: 300 });

    await this.waitForTimeout(500);
    await this.waitForSelector(pickedCountrySelector);
    await this.click(pickedCountrySelector, { delay: 100 });
    await this.waitForTimeout(300);

    await this.click(nameInputSelector, { clickCount: 3 });
    if (name) {
      await this.type(nameInputSelector, name);
    } else {
      await this.keyboard.press('Backspace');
    }

    await this.click(descriptionInputSelector, { clickCount: 3 });
    await this.type(descriptionInputSelector, description);

    await this.click(updateButtonSelector);

    await this.click(closeModalButtonSelector);
  }

  /**
   * Gets the contents of the element.
   */
  async getContentsOf(selector: string) {
    return await this.page.$eval(selector, el => el.innerHTML);
  }

  /**
   * Gets the content of the placeholder.
   * @param {String} selector
   * @returns {Promise<string>}
   */
  async getPlaceholderOf(selector: string) {
    return await this.page.$eval(selector, (el: any) => el.placeholder);
  }

  /**
   * Executes the native fetch function inside the chromium browser.
   * The function will make a request to the graphQL endpoint calling
   * the evaluate method on the Page class.
   */
  async fetch(method: string, query: string, variables: object) {
    const callback = (
      _query: string,
      _variables: string,
      _method: string,
      _endpoint: string
    ) =>
      fetch(_endpoint, {
        method: _method.toUpperCase(),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: _query, variables: _variables }),
      })
        .then(res => res.json())
        .then(json => json.errors[0].message);

    return await this.evaluate(callback, query, variables, method, this.graphQLEndpoint);
  }
}
