// Define a function that helps filtering searched docs.
export default (searchText, ...fields) => {
	// Create an array with split search words.
	let searchPhrases = searchText.split(' ');
	// Define empty results array.
	let results = [];
	// Loop over every search phrase and check result
	// for every field.
	searchPhrases.forEach(phrase => {
		// Initialize search result for every field to false.
		let fieldResult = false;
		// Loop over each field and search for the phrase.
		fields.forEach(field => {
			// Check if particular field contains the phrase.
			let isFound = field.toLowerCase().includes(phrase.trim().toLowerCase());
			// If a field contains searched phrase,
			// set field search result to true.
			if (isFound) {
				fieldResult = true;
			}
		});
		// Push every field search result to results array.
		results.push(fieldResult);
	});
	// If every field result met search criteria.
	return results.every(result => result === true);
};
