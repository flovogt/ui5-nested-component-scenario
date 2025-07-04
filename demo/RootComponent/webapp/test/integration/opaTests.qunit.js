sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourney"
], (Opa5, Startup) => {
	"use strict";

	Opa5.extendConfig({
		autoWait: true,
		arrangements: new Startup(),
		pollingInterval: 10,
		viewNamespace: "my.lib.sample.root.view."
	});

});