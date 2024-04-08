sap.ui.define([
	"sap/ui/test/Opa5",
	"my/lib/sample/root/localService/mockserver",
	"sap/ui/model/odata/v2/ODataModel"
], (Opa5, mockserver, ODataModel) => {
	"use strict";

	return Opa5.extend("my.lib.sample.root.test.integration.arrangements.Startup", {

		/**
		 * Initializes mock server, then starts the app component
		 * @param {object} oOptionsParameter An object that contains the configuration for starting up the app
		 * @param {integer} oOptionsParameter.delay A custom delay to start the app with
		 * @param {string} [oOptionsParameter.hash] The in-app hash can also be passed separately for better readability in tests
		 * @param {boolean} [oOptionsParameter.autoWait=true] Automatically wait for pending requests while the application is starting up
		 */
		iStartMyApp (oOptionsParameter) {
			const oOptions = oOptionsParameter || {};

			this._clearSharedData();

			// Start the app with a minimal delay to make tests fast but still async to discover basic timing issues
			oOptions.delay ||= 1;

			// Configure mock server with the current options
			const oMockServerInitialized = mockserver.init(oOptions);

			this.iWaitForPromise(oMockServerInitialized);
			
			// Start the app UI component
			this.iStartMyUIComponent({
				componentConfig: {
					name: "my.lib.sample.root",
					async: true
				},
				hash: oOptions.hash,
				autoWait: oOptions.autoWait
			});
		},
		_clearSharedData () {
			// Clear shared metadata in ODataModel to allow tests for loading the metadata
			ODataModel.mSharedData = { server: {}, service: {}, meta: {} };
		}
	});
});