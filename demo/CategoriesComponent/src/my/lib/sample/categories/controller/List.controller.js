sap.ui.define([
	"my/lib/sample/base/BaseController",
	"sap/base/Log"
], (Controller, Log) => {
	"use strict";

	return Controller.extend("my.lib.sample.categories.controller.List", {
		onPressListItem(oEvent) {
			Log.info(this.getView().getControllerName(), "onPressListItem");

			const oBindingContext = oEvent.getSource().getBindingContext();

			/*
			 * Navigate to the detail page. Because the products component is
			 * integrated in the detail page, it's also needed to provide route
			 * information for the deeply nested products component
			 */
			this.getOwnerComponent()
				.getRouter()
				.navTo("detailRoute", {
					id: oBindingContext.getProperty("CategoryID")
				}, {
					productsTarget: {
						route: "listRoute",
						parameters: {
							/*
							 * Encode the path because it could contain "/" which
							 * isn't allowed to use as pattern parameter directly
							 */
							basepath: encodeURIComponent(oBindingContext.getPath())
						}
					}
				});
		}
	});
});
