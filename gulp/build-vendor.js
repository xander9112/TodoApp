'use strict';

module.exports = (gulp, plugins, config) => () => {
	return gulp.src(config.paths.vendor)
		.pipe(plugins.plumber())
		.pipe(plugins.concat('vendor.js', { newLine: ';\n' }))
		.pipe(plugins.if(config.production, plugins.uglify()))
		.pipe(gulp.dest(`${config.paths.dist}/${config.build.vendor}`));
	/*		.pipe(webpackStream(webpackConfig))
	 .pipe(plugins.rename('bundle.js'))
	 .pipe(plugins.if(config.production, plugins.uglify()))
	 .pipe(gulp.dest(`${config.paths.dist}/${config.output.js}`))*/
};
