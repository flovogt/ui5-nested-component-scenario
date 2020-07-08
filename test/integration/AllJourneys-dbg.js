sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourney"
], function (Opa5, Startup) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "my.lib.sample.root.view.",
		timeout: 2,
		pollingInterval: 10,
		autoWait: true
	});
});