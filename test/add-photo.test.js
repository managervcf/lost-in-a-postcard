import { CustomPage } from './helpers/page';
import { testPhoto, DELETE_PHOTO } from './mocks';
import { models } from '../server/models';

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
describe('when logged in', () => {
  beforeEach(async () => {
    /**
     * Log in a test user.
     */
    await page.login();
  });

  describe('and when submits a new photo', () => {
    beforeEach(async () => {
      /**
       * Submits a new photo form with valid data.
       */
      await page.addPhoto();
    });

    it(`renders a new navigation link item`, async () => {
      /**
       * 1. Define a selector.
       * 2. Pull off contents of the selector.
       * 3. Create a new regex based on the test country name.
       * 4. Make assertions.
       */
      const navbarListSelector = 'header > nav > ul';
      const navbarListContent = await page.getContentsOf(navbarListSelector);
      const regex = new RegExp(testPhoto.country, 'gi');
      expect(navbarListContent).toMatch(regex);
    });

    it('renders the new photo', async () => {
      /**
       * 0. Expect assertions inside the try/catch block.
       * 1. Define selectors.
       * 2. Pull out the photo from the database.
       * 3. Create new regex for the public_id.
       * 4. Make an assertion about an image in the gallery with
       *    a src attribute including the public_id.
       */
      expect.assertions(1);
      try {
        const gallerySelector = '.gallery';
        const savedPhoto = await models.Photo.findOne({
          caption: testPhoto.caption,
        });
        if (!savedPhoto) {
          throw new Error('Photo not found in the database');
        }
        const galleryContent = await page.getContentsOf(gallerySelector);
        const re = new RegExp(savedPhoto?.upload.public_id, 'g');
        expect(galleryContent).toMatch(re);
      } catch (e) {
        console.log(e);
      }
    });

    // it(`${testPhoto.country} gallery is visible`, async () => {
    //   await page.goTo(`/photos/${testPhoto.country}`);
    //   const gallery = await page.getContentsOf('.gallery');
    //   console.log('gallery:', gallery);
    //   expect(gallery).toBeDefined();
    // });
  });

  describe('and when submits an empty new photo form', () => {
    beforeEach(async () => {
      /**
       * Submits a new photo form with valid data.
       */
      await page.addPhoto({
        file: '',
        country: '',
      });
    });

    it('shows an error message regarding the country', async () => {
      /**
       * 1. Define the selector.
       * 2. Pull of contents of the error message.
       * 3. Make assertions.
       */
      const errorMessageSelector = 'div.error';
      await page.waitFor(errorMessageSelector);
      const errorMessageText = await page.getContentsOf(errorMessageSelector);
      expect(errorMessageText).toMatch(/must provide a country name/i);
    });
  });

  describe('and when submits a new photo without a file', () => {
    beforeEach(async () => {
      /**
       * Submits a new photo form with valid data.
       */
      await page.addPhoto({
        ...testPhoto,
        file: '',
      });
    });

    it('shows an error message regarding the file', async () => {
      /**
       * 1. Define the selector.
       * 2. Pull of contents of the error message.
       * 3. Make assertions.
       */
      const errorMessageSelector = 'div.error';
      await page.waitFor(errorMessageSelector);
      const errorMessageText = await page.getContentsOf(errorMessageSelector);
      expect(errorMessageText).toMatch(/must upload a file/i);
    });
  });
});

describe('when not logged in', () => {
  describe('and when tries to delete a photo through the chromium console', () => {
    it('cannot delete a photo', async () => {
      /**
       * 1. Make a post request inside the chromium console.
       * 2. Make assertions.
       */
      const result = await page.fetch('post', DELETE_PHOTO, { id: 'str' });
      expect(result).toMatch(/unauthenticated/i);
    });
  });
});
