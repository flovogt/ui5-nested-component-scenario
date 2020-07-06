sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press"
], function(Opa5, Press) {
	"use strict";

	var sViewName = "App";

	Opa5.createPageObjects({
		onTheAppPage : {
            viewName: sViewName,
			actions : {

				iClickOnItem : function (sId) {
					return this.waitFor({
						id: sId,
						actions: new Press({}),
						success: function () {
							Opa5.assert.ok(true, "The control with id '" + sId + "' was pressed.");
						}
					});
				}
			},

			assertions : {
                iShouldSeeToolPageContentDisplayed: function(sTitle){
                    return this.waitFor({
                        id : "toolPage",
                        check: function(oToolPage){
                           return sTitle === oToolPage.getHeader().getContent()[1].getText();
                        },
						success : function () {
							Opa5.assert.ok(true, "The toolpage with title '" + sTitle + "' is displayed.");
						},
						errorMessage : "The toolpage with title '" + sTitle + "' is not displayed."
					});
                }
            }

		}

	});

});