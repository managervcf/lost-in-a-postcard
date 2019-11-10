// Function that trims and capitalizes a string.
export default text =>
  text
    // Trim left and right hand side.
    .trim()
    // Divide into words.
		.split(' ')
		// Map over each word to capitalize the first letter.
    .map(word =>
			word
				// Split into individual letters.
				.split('')
				// Capitalize first letter.
        .map((character, index) =>
          index === 0 ? character.toUpperCase() : character.toLowerCase()
				)
				// Join letters back together.
        .join('')
		)
		// Join words back together.
    .join(' ');
