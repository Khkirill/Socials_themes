'use strict';
const path = require('path');
const binBuild = require('bin-build');
const bin = require('.');

(async () => {
	try {
		await bin.run(['--version']);
		console.log('gifsicle pre-build test passed successfully');
	} catch (error) {
		console.warn(error.message);
		console.warn('gifsicle pre-build test failed');
		console.info('compiling from source');

		const config = [
			'./configure --disable-gifview --disable-gifdiff',
			`--prefix="${bin.dest()}" --bindir="${bin.dest()}"`
		].join(' ');

		try {
			await binBuild.file(path.resolve(__dirname, '../vendor/source/gifsicle-1.92.tar.gz'), [
				'autoreconf -ivf',
				config,
				'make install'
			]);

			console.log('gifsicle built successfully');
		} catch (error) {
			console.error(error.stack);

			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		}
	}
})();
