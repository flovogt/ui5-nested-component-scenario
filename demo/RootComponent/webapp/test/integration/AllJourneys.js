sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourney"
], (Opa5, Startup) => {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "my.lib.sample.root.view.",
		pollingInterval: 10,
		autoWait: true
	});
});