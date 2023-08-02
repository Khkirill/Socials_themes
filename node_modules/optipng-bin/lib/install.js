'use strict';
const path = require('path');
const binBuild = require('bin-build');
const bin = require('./index.js');

(async () => {
	try {
		await bin.run(['--version']);
		console.log('optipng pre-build test passed successfully');
	} catch (error) {
		console.warn(error.message);
		console.warn('optipng pre-build test failed');
		console.info('compiling from source');

		try {
			// From https://sourceforge.net/projects/optipng/files/OptiPNG/
			await binBuild.file(path.resolve(__dirname, '../vendor/source/optipng.tar.gz'), [
				`./configure --with-system-zlib --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
				'make install'
			]);

			console.log('optipng built successfully');
		} catch (error) {
			console.error(error.stack);

			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		}
	}
})();
