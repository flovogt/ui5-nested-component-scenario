sap.ui.define([
	"sap/ui/core/Lib"
], (Library) => {

	"use strict";

	return Library.init({
		name : "my.lib.sample.base",
		apiVersion: 2,
		// eslint-disable-next-line no-template-curly-in-string
		version : "0.0.1",
		noLibraryCSS: true,
		dependencies : [ "sap.ui.core" ],
		controls : [ ],
		types : [ ]
	});
});
