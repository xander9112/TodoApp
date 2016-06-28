module.exports = {
	paths:      {
		styles:       './resources/assets/styles',
		stylesBlocks: [
			'./resources/assets/styles/blocks.less',
			'./resources/assets/styles/blocks/*.less'
		],
		entry:        './resources/assets/js/index.js',
		js:           './resources/assets/js/**/*.js',
		vendor:       [
			'./resources/assets/vendor/jquery-2.2.3.min.js',
			'./resources/assets/vendor/lodash.core.min.js',
			'./resources/assets/vendor/**/*.js'
		],
		html:         './resources/*.html',
		dist:         './',
		images:       './resources/assets/images/**/*',
		sprite:       './resources/assets/images/sprite/*',
		fonts:        './resources/assets/fonts/**/*'
	},
	build:      {
		js:           './assets/js',
		vendor:       './assets/vendor',
		styles:       './assets/css',
		stylesBlocks: './resources/assets/styles',
		images:       './assets/images',
		sprite:       './assets/images/sprite',
		fonts:        './assets/fonts'
	},
	clean:      './assets/',
	production: false
};
