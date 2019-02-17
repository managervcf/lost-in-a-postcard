// Import sampleData
const books = require('./sampleData');

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
	Query: {
		books: () => books
	}
};

module.exports = resolvers;
