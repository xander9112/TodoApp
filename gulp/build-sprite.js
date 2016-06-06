'use strict';

module.exports = (gulp, plugins, config) => () => {
    var spriteData =
        gulp.src(config.paths.sprite) // путь, откуда берем картинки для спрайта
            .pipe(plugins.spritesmith({
                imgName:     'sprite.png',
                cssName:     'sprite.less',
                cssFormat:   'css',
                imgPath:     '../images/sprite/sprite.png',
                padding:     2,
                algorithm:   'binary-tree',
                cssSelector: function (item) {
                    return '.g-icon-' + item.name;
                }
            }));

    spriteData.img.pipe(gulp.dest(config.build.sprite)); // путь, куда сохраняем картинку
    return spriteData.css.pipe(gulp.dest(config.paths.styles)); // путь, куда сохраняем стили
};
