sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/ui/model/json/JSONModel",
	"sap/base/Log"
], (MockServer, JSONModel, Log) => {
	"use strict";


	let oMockServer;

	const sAppPath = "my/lib/sample/categories/",
	 sJsonFilesPath = `${sAppPath  }localService/mockdata`,
	 oMockServerInterface = {

		/**
		 * Initializes the mock server asynchronously.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @protected
		 * @param {object} [oOptionsParameter] init parameters for the mockserver
		 * @returns{Promise} a promise that is resolved when the mock server has been started
		 */
		init (oOptionsParameter) {
			const oOptions = oOptionsParameter || {};

			return new Promise((fnResolve, fnReject) => {
				const sManifestUrl = sap.ui.require.toUrl(`${sAppPath  }manifest.json`),
					oManifestModel = new JSONModel(sManifestUrl);

				oManifestModel.attachRequestCompleted(() =>  {
					const oSearchParams = new URLSearchParams(window.location.search),
						// Parse manifest for local metadata URI
						sJsonFilesUrl = sap.ui.require.toUrl(sJsonFilesPath),
						oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService"),
						sMetadataUrl = sap.ui.require.toUrl(sAppPath + oMainDataSource.settings.localUri),
						// Ensure there is a trailing slash
						sMockServerUrl = /.*\/$/u.test(oMainDataSource.uri) ? oMainDataSource.uri : `${oMainDataSource.uri  }/`;

					// Create a mock server instance or stop the existing one to reinitialize
					if (!oMockServer) {
						oMockServer = new MockServer({
							rootUri: sMockServerUrl
						});
					} else {
						oMockServer.stop();
					}

					// Configure mock server with the given options or a default delay of 0.5s
					MockServer.config({
						autoRespond : true,
						autoRespondAfter : (oOptions.delay || oSearchParams.get("serverDelay") || 500)
					});

					// Simulate all requests using mock data
					oMockServer.simulate(sMetadataUrl, {
						sMockdataBaseUrl : sJsonFilesUrl,
						bGenerateMissingMockData : true
					});

					const aRequests = oMockServer.getRequests(),

					// Compose an error response for each request
					 fnResponse = (iErrCode, sMessage, aRequest) => {
						aRequest.response = (oXhr) => {
							oXhr.respond(iErrCode, {"Content-Type": "text/plain;charset=utf-8"}, sMessage);
						};
					};

					// Simulate metadata errors
					if (oOptions.metadataError || oSearchParams.get("metadataError")) {
						aRequests.forEach((aEntry) => {
							if (aEntry.path.toString().indexOf("$metadata") > -1) {
								fnResponse(500, "metadata Error", aEntry);
							}
						});
					}

					// Simulate request errors
					const sErrorParam = oOptions.errorType || oSearchParams.get("errorType"),
						iErrorCode = sErrorParam === "badRequest" ? 400 : 500;
					if (sErrorParam) {
						aRequests.forEach((aEntry) => {
							fnResponse(iErrorCode, sErrorParam, aEntry);
						});
					}

					// Custom mock behaviour may be added here

					// Set requests and start the server
					oMockServer.setRequests(aRequests);
					oMockServer.start();

					Log.info("Running the app with mock data");
					fnResolve();
				});

				oManifestModel.attachRequestFailed(() => {
					const sError = "Failed to load application manifest";

					Log.error(sError);
					fnReject(new Error(sError));
				});
			});
		},

		/**
		 * @public returns the mockserver of the app, should be used in integration tests
		 * @returns {sap.ui.core.util.MockServer} the mockserver instance
		 */
		getMockServer () {
			return oMockServer;
		}
	};

	return oMockServerInterface;
});