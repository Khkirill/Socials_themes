'use strict';
const {XMLParser, XMLValidator} = require('fast-xml-parser');

const isSvg = input => {
	if (input === undefined || input === null) {
		return false;
	}

	input = input.toString().trim();

	if (input.length === 0) {
		return false;
	}

	// Has to be `!==` as it can also return an object with error info.
	if (XMLValidator.validate(input) !== true) {
		return false;
	}

	let jsonObject;
	const parser = new XMLParser();

	try {
		jsonObject = parser.parse(input);
	} catch (_) {
		return false;
	}

	if (!jsonObject) {
		return false;
	}

	if (!('svg' in jsonObject)) {
		return false;
	}

	return true;
};

module.exports = isSvg;
// TODO: Remove this for the next major release
module.exports.default = isSvg;
