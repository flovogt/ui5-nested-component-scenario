/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(() => {
	"use strict";

	sap.ui.require([
		"my/lib/sample/root/test/unit/AllTests"
	], () => {
		QUnit.start();
	});
});