sap.ui.define([
	"my/lib/sample/base/BaseController",
	"sap/base/Log"
], (Controller, Log) => {
	"use strict";
	return Controller.extend("my.lib.sample.suppliers.controller.List", {
		onPressListItem(oEvent) {
			Log.info(this.getView().getControllerName(), "onPressListItem");

			const oBindingContext = oEvent.getSource().getBindingContext();

			this.getOwnerComponent()
				.getRouter()
				.navTo("detailRoute", {
					id: oBindingContext.getProperty("SupplierID")
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
