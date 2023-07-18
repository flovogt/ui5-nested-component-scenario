sap.ui.define([
	"../localService/mockserver"
], (mockserver) => {
	"use strict";

	const aMockservers = [];

	// Initialize the mock server
	aMockservers.push(mockserver.init());

	Promise.all(aMockservers).catch(async (oError) => {
		await sap.ui.getCore().loadLibrary("sap.m", { async: true });
		sap.ui.require(["sap/m/MessageBox"], (MessageBox) => {
			MessageBox.error(oError.message);
		});
	}).finally(() => {
		// Initialize the embedded component on the HTML page
		sap.ui.require(["sap/ui/core/ComponentSupport"]);
	});
});