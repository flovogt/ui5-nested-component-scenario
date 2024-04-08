sap.ui.define(() => {

	"use strict";

	sap.ui.getCore().initLibrary({
		name : "my.lib.sample.base",
		// eslint-disable-next-line no-template-curly-in-string
		version : "0.0.1",
		noLibraryCSS: true,
		dependencies : [ "sap.ui.core" ],
		controls : [ ],
		types : [ ]
	});
	// eslint-disable-next-line no-undef
	return my.lib.sample.base;
});
