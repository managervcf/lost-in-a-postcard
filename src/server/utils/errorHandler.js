// Create error handler to throw an user defined
// error message when condition is met.
export const throwError = (condition, errorMessage) => {
  if (condition) throw new Error(errorMessage);
};
