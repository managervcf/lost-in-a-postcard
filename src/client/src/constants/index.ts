import { createTheme } from '@mui/material';

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
/**
 * Table row number options.
 */
export const ROW_OPTIONS = [10, 25, 50, 100];
/**
 * MUI theme.
 */
export const theme = createTheme({
  palette: {
    secondary: {
      main: '#C0D8C0',
    },
    primary: {
      main: '#f8a488',
    },
  },
  typography: {
    fontSize: 24,
    fontFamily: 'Quicksand',
  },
});
