// Function that trims and capitalizes a string.
export default text =>
	text
		.trim()
		.split('')
		.map((character, index) =>
			index === 0 ? character.toUpperCase() : character.toLowerCase()
		)
		.join('');
