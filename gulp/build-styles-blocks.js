'use strict';

module.exports = (gulp, plugins, config) => () => {
	return gulp.src(config.paths.stylesBlocks[ 0 ])
		.pipe(plugins.inject(gulp.src(config.paths.stylesBlocks[ 1 ], { read: false }), {
			relative:  true,
			starttag:  '/* inject:imports */',
			endtag:    '/* endinject */',
			transform: function (filepath) {
				return '@import "' + filepath + '";';
			}
		}))
		.pipe(gulp.dest(config.build.stylesBlocks))
};
/*
 'use strict';

 module.exports = (gulp, plugins, config) => () => {
 return gulp.src(config.paths.sass)
 .pipe(plugins.sourcemaps.init())
 .pipe(plugins.sass().on('error', plugins.sass.logError))
 .pipe(plugins.autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
 .pipe(plugins.minifyCss())
 .pipe(plugins.sourcemaps.write())
 .pipe(plugins.rename({ suffix: '.min' }))
 .pipe(gulp.dest(`${config.paths.dist}/${config.output.css}`))
 };
 */
