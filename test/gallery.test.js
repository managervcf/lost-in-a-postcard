import { CustomPage } from './helpers/page';

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
describe('when navigates to the /photos/featured', () => {
  beforeEach(async () => {
    /**
     * 1. Navigate to /.
     */
    await page.goTo();
  });

  it('renders the gallery', async () => {
    /**
     * 1. Define a selector.
     * 2. Pull off contents of the selector.
     * 3. Make assertions.
     */
    const gallerySelector = '#root > main > article';
    const galleryText = await page.getContentsOf(gallerySelector);
    expect(galleryText).toMatch(/portfolio/i);
  });

  it('renders the gallery description', async () => {
    /**
     * 1. Define a selector.
     * 2. Pull off contents of the selector.
     * 3. Make assertions.
     */
    const galleryDescSelector = 'main > article > div > section';
    const galleryDescText = await page.getContentsOf(galleryDescSelector);
    expect(galleryDescText).toMatch(/portfolio/i);
  });

  const photoCaptionSelector = '.gallery-caption';
  const heartSelector = '.heart';

  describe('and when logged in', () => {
    beforeEach(async () => {
      /**
       * Login with valid credentials (using the page.login method).
       */
      await page.login();
    });

    it('renders the photo caption', async () => {
      /**
       * 1. Pull off contents of the selector.
       * 2. Make assertions.
       */
      const photoCaptionContent = await page.getContentsOf(
        photoCaptionSelector
      );

      expect(photoCaptionContent).not.toBeNull();
    });

    it('does not render the heart', async () => {
      /**
       * 1. Pull off contents of the selector.
       * 2. Make assertions.
       */
      let error = '';
      try {
        await page.getContentsOf(heartSelector);
      } catch (e) {
        error = e;
      }
      expect(error.toString()).toMatch(heartSelector);
    });
  });

  describe('and when not logged in', () => {
    it('does not render the photo caption', async () => {
      /**
       * 1. Pull off contents of the selector.
       * 2. Make assertions.
       */
      let error = '';
      try {
        await page.getContentsOf(photoCaptionSelector);
      } catch (e) {
        error = e;
      }
      expect(error.toString()).toMatch(photoCaptionSelector);
    });

    it('renders the heart', async () => {
      /**
       * 1. Pull off contents of the selector.
       * 2. Make assertions.
       */
      const heartContent = await page.getContentsOf(heartSelector);
      expect(heartContent).not.toBeNull();
    });
  });
});

describe('when navigates to the /photos/:country', () => {
  beforeEach(async () => {
    /**
     * 1. Navigate to /.
     * 2. Define selectors.
     * 3. Pull off selectors content.
     * 4. Navigate to /photos/:country.
     */
    await page.goTo();
    const firstNavLinkSelector =
      '#root > header > nav > ul > div:nth-child(1) > a';
    const navLinkContent = await page.getContentsOf(firstNavLinkSelector);
    await page.goTo(`/photos/${navLinkContent.toLowerCase()}`);
  });

  it('does not render the gallery description', async () => {
    /**
     * 1. Define a selector.
     * 2. Pull off contents of the selector.
     * 3. Make assertions.
     */
    const galleryDescSelector = 'main > article > div > section';
    let error = '';
    try {
      await page.getContentsOf(galleryDescSelector);
    } catch (e) {
      error = e;
    }
    expect(error.toString()).toMatch(galleryDescSelector);
  });
});
