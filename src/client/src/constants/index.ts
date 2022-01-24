/**
 * Default animation classes used for animating
 * React components on mount.
 */
export enum DefaultAnimationClasses {
  preMountClass = 'fade-out',
  postMountClass = 'fade-in',
}
/**
 * Error messages.
 */
export enum Errors {
  CountryNameTooShort = 'Country name must contain at least 3 characters',
  NoCountryNameProvided = 'Must provide a country name',
  NoFileProvided = 'Must upload a file',
  NoIdProvided = 'Must choose a country',
}
/**
 * Photo fetch limit.
 */
export const FETCH_LIMIT = 10000;
/**
 * Photo items table limit.
 */
export const PHOTO_ITEM_LIMIT = 50;
/**
 * Set the standard display limit.
 */
export const DISPLAY_LIMIT = 10;
/**
 * AWs resource base url.
 */
export const AWS_URL = 'https://lost-in-a-postcard.s3-ap-southeast-2.amazonaws.com/';
/**
 * Primary app color.
 */
export const PRIMARY_COLOR = '#f8a488';
