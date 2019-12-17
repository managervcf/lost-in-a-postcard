// Create error handler to throw an user defined
// error message when condition is met.
export default (condition, errorMessage) => {
  if (condition) throw new Error(errorMessage);
};
