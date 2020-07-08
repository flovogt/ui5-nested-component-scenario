sap.ui.define([
	"sap/ui/test/Opa5"
], function(Opa5) {
	"use strict";

	var sViewName = "Home",
		sPageId = "homePage";

	Opa5.createPageObjects({
		onTheHomePage : {
            viewName: sViewName,

            actions : {},

			assertions : {

				iShouldSeeTheScreen : function () {
					return this.waitFor({
						id : sPageId,
						success : function () {
							Opa5.assert.ok(true, "The page with id '" + sPageId + "' is displayed.");
						},
						errorMessage : "The page with id '" + sPageId + "' can not be found."
					});
				}

			}

		}

	});

});