module.exports = function(config) {
	"use strict";

	require("./karma.conf")(config);
	config.set({

		preprocessors: {
			"{webapp,webapp/!(test|localService)}/*.js": ["coverage"]
		},

		coverageReporter: {
			includeAllSources: true,
			reporters: [
				{
					type: "html",
					subdir: "html",
					dir: "coverage"
				},
				{
					type: "text"
				},
				{
					type: "lcovonly",
					subdir: "lcov",
					file: "lcov.info"
				}
			],
			check: {
				each: {
					statements: 100,
					branches: 100,
					functions: 100,
					lines: 100
				}
			}
		},

		reporters: ["progress", "coverage"],

		browsers: ["CustomChromeHeadless"],

		singleRun: true

	});
};