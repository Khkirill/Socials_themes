import webpack from "webpack-stream";

export const js = () => {
	return app.gulp.src(app.path.src.js, {
			sourcemaps: app.isDev
		})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "JS",
				message: "Error <%= error.message %>"
			})
		))
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'development',
			output: {
				filename: 'app.min.js'
			}
		}))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
}