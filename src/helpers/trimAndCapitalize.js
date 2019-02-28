// Function that trims and capitalizes a string.
export default text =>
	text
		.trim()
		.split('')
		.map((char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase()))
		.join('');
