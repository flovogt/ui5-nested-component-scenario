sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press"
], (Opa5, Press) => {
	"use strict";

	const sViewName = "App";

	Opa5.createPageObjects({
		onTheAppPage : {
            viewName: sViewName,
			actions : {

				iClickOnItem (sId) {
					return this.waitFor({
						id: sId,
						actions: new Press({}),
						success () {
							Opa5.assert.ok(true, `The control with id '${  sId  }' was pressed.`);
						}
					});
				}
			},

			assertions : {
                iShouldSeeToolPageContentDisplayed(sTitle){
                    return this.waitFor({
                        id : "toolPage",
                        check(oToolPage){
                           return sTitle === oToolPage.getHeader().getContent()[1].getText();
                        },
						success () {
							Opa5.assert.ok(true, `The toolpage with title '${  sTitle  }' is displayed.`);
						},
						errorMessage : `The toolpage with title '${  sTitle  }' is not displayed.`
					});
                }
            }

		}

	});

});