sap.ui.define(function () {
	"use strict";
	return {
		name: "QUnit test suite for RootComponent",
		defaults: {
			page: "ui5://test-resources/my/lib/sample/root/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 4
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "my/lib/sample/root/",
				never: "test-resources/my/lib/sample/root/"
			},
			loader: {
				paths: {
					"my/lib/sample/root": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for RootComponent"
			},
			"integration/opaTests": {
				title: "Integration tests for RootComponent"
			}
		}
	};
});
