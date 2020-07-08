/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/App",
	"./pages/Home"
], function (opaTest) {
	"use strict";

	QUnit.module("Navigation Journey");

	opaTest("Should navigate to the different pages", function (Given, When, Then) {
        
        // Arrangements
		Given.iStartMyApp();

        // Assertions
        Then.onTheHomePage.iShouldSeeTheScreen();

		// Actions
		When.onTheAppPage.iClickOnItem("suppliersItem");

		// Assertions
        Then.onTheAppPage.iShouldSeeToolPageContentDisplayed("Supplier List");

        // Actions
        When.onTheAppPage.iClickOnItem("homeItem");

        // Assertions
        Then.onTheAppPage.iShouldSeeToolPageContentDisplayed("Home");
        
        // Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should navigate to unknown site", function (Given, When, Then) {
        
        // Arrangements
		Given.iStartMyApp({hash: "coool"});

        // Assertions
        Then.onTheAppPage.iShouldSeeToolPageContentDisplayed("Component Based Navigation Demo");
        
        // Cleanup
		Then.iTeardownMyApp();
	});

});