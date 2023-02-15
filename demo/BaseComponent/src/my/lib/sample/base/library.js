sap.ui.define(function() {

	"use strict";

	sap.ui.getCore().initLibrary({
		name : "my.lib.sample.base",
		version : "${version}",
		noLibraryCSS: true,
		dependencies : [ "sap.ui.core" ],
		controls : [ ],
		types : [ ]
	});

	return my.lib.sample.base;
});
