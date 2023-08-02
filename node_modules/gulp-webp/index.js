'use strict';
const PluginError = require('plugin-error');
const through = require('through2');
const imageminWebp = require('imagemin-webp');

const supportedExtensions = new Set([
	'png',
	'jpg',
	'jpeg',
	'tif',
	'tiff',
	'webp'
]);

module.exports = options => {
	const instance = imageminWebp(options);

	return through.obj((file, encoding, callback) => {
		if (file.isNull()) {
			callback(null, file);
			return;
		}

		if (file.isStream()) {
			callback(new PluginError('gulp-webp', 'Streaming not supported'));
			return;
		}

		const ext = file.extname.slice(1).toLowerCase();
		if (!supportedExtensions.has(ext)) {
			callback(null, file);
			return;
		}

		instance(file.contents)
			.then(result => {
				file.contents = result;
				file.extname = '.webp';
				callback(null, file);
			})
			.catch(error => {
				callback(new PluginError('gulp-webp', error, {fileName: file.path}));
			});
	});
};
