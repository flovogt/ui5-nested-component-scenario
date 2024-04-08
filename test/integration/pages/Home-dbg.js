sap.ui.define([
	"sap/ui/test/Opa5"
], (Opa5) => {
	"use strict";

	const sPageId = "homePage",
		sViewName = "Home";

	Opa5.createPageObjects({
		onTheHomePage : {
            viewName: sViewName,

            actions : {},

			assertions : {

				iShouldSeeTheScreen () {
					return this.waitFor({
						id : sPageId,
						success () {
							Opa5.assert.ok(true, `The page with id '${  sPageId  }' is displayed.`);
						},
						errorMessage : `The page with id '${  sPageId  }' can not be found.`
					});
				}

			}

		}

	});

});