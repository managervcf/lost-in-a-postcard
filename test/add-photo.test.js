import { CustomPage } from './helpers/page';
import { testPhoto } from './mocks';
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
    beforeEach(async done => {
      /**
       * 1. Define selectors for the add photo button,
       *    all the inputs, and the send button.
       * 2. Clicks on the button to open the new form.
       * 3. Creates an element handle for the file input.
       * 4. Enters valid data and uploads the file.
       * 5. Submits the new photo.
       * 6. Waits for the asset to be uploaded and
       *    the records to be saved in the database.
       * 7. Navigate to the /photos/${testPhoto.country} page
       */
      const addPhotoSelector = '.dashboard > div:nth-child(2) > button';
      const countryInputSelector =
        '.dashboard > div:nth-child(2) > form > input[type=text]:nth-child(1)';
      const captionInputSelector =
        '.dashboard > div:nth-child(2) > form > input[type=text]:nth-child(2)';
      const featuredCheckboxSelector =
        '.dashboard > div:nth-child(2) > form > div > label > span';
      const fileInputSelector =
        '.dashboard > div:nth-child(2) > form > input[type=file]:nth-child(4)';
      const sendButtonSelector =
        '.dashboard > div:nth-child(2) > form > button';

      await page.waitFor(addPhotoSelector);
      await page.click(addPhotoSelector);
      const inputUploadHandle = await page.$(fileInputSelector);

      await page.type(countryInputSelector, testPhoto.country);
      await page.type(captionInputSelector, testPhoto.caption);
      if (testPhoto.featured) {
        await page.click(featuredCheckboxSelector);
      }
      await page.click(fileInputSelector);
      inputUploadHandle.uploadFile(testPhoto.file);

      await page.click(sendButtonSelector);

      await page.waitFor(3000);
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
    beforeEach(async done => {
      /**
       * 1. Define selectors.
       * 2. Click on the add photo button.
       * 3. Click on the send button.
       */
      try {
        const addPhotoSelector =
          '#root > header > div.dashboard > div:nth-child(2) > button';
        const sendButtonSelector = 'form > button';

        await page.click(addPhotoSelector);
        await page.click(sendButtonSelector);
        done();
      } catch (e) {
        done(e);
      }
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
    beforeEach(async done => {
      /**
       * 1. Define selectors.
       * 2. Click on the add photo button.
       * 3. Enter a country name.
       * 3. Click on the send button.
       */
      const addPhotoSelector =
        '#root > header > div.dashboard > div:nth-child(2) > button';
      const countryInputSelector = 'form > input[type=text]:nth-child(1)';
      const sendButtonSelector = 'form > button';

      try {
        await page.click(addPhotoSelector);
        await page.type(countryInputSelector, testPhoto.country);
        await page.click(sendButtonSelector);
        done();
      } catch (e) {
        done(e);
      }
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
  describe('and when submits a new photo through the chromium console', () => {
    it.todo('returns a 401 unauthorized');
  });
});
