/**
 * Scrolls to top of the page.
 */
export const scrollToTop = (top: number = 0, behavior: ScrollBehavior = 'smooth') =>
  window.scrollTo({ top, behavior });
