// Define error handling middleware
export const errorHandlingMiddleware = (err, req, res, next) => {
  // Print out error to the console.
  console.error('(Error Handling Middleware)', err);
  // Send a generic error.
  return res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
