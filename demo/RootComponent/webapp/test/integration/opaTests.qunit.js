  
/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"my/lib/sample/root/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});