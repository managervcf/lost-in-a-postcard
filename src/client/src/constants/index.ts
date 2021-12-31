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
export const FETCH_LIMIT = 10;
/**
 * AWs resource base url.
 */
export const AWS_URL = 'https://lost-in-a-postcard.s3-ap-southeast-2.amazonaws.com/';
