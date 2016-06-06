'use strict';

module.exports = (gulp, plugins, config) => () => {
    return gulp.src(`${config.paths.styles}/site.less`)
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer({
            browsers: [ 'last 2 versions' ],
            cascade:  false
        }))
        .pipe(plugins.concat('style.css'))
        .pipe(plugins.if(config.production, plugins.csso()))
        .pipe(gulp.dest(config.build.styles));
};
