sap.ui.define([
	"my/lib/sample/base/BaseController",
	"sap/m/ColumnListItem",
	"sap/m/Text",
	"sap/base/Log",
	"sap/ui/model/type/Currency"
], (BaseController,	ColumnListItem, Text, Log, Currency) => {
	"use strict";

	return BaseController.extend("my.lib.sample.products.controller.List", {

		onInit(...args) {
			BaseController.prototype.onInit.apply(this, args);
			this.getOwnerComponent().getRouter().getRoute("listRoute").attachMatched(this._onMatched, this);
		},

		_onMatched(oEvent) {
			const oArgs = oEvent.getParameter("arguments"),
			 sPath = `${decodeURIComponent(oArgs.basepath || "")  }/Products`,
			 oTable = this.getView().byId("table"),
			 that = this;

			oTable.bindItems({
				path: sPath,
				parameters: {
					expand: "Supplier"
				},
				template: new ColumnListItem({
					type: "Navigation",
					press: that.onPressListItem.bind(that),
					cells: [
						new Text({ text: "{ProductID}" }),
						new Text({ text: "{ProductName}" }),
						new Text({ text: "{Supplier/CompanyName}" }),
						new Text({ text: {
							parts: [{
								path: "UnitPrice"
							}, {
								value: "$"
							}],
							type: new Currency({
								currencyCode: false
							})
						} })
					]
				})
			});
		},

		onPressListItem(oEvent) {
			Log.info(this.getView().getControllerName(), "onPressListItem");

			const sProductID = oEvent.getSource().getBindingContext().getProperty("ProductID");

			/*
			 * Inform the parent component about the navigation to the detail page
			 * 
			 * the navigation isn't done within this component because when this component is embedded
			 * in suppliers/categories component, it should trigger the navigation within the root
			 * component.
			 * 
			 * simply always inform the parent component that a navigation to the detail page is needed.
			 * In the deeply nested use case, the direct parent component forwards this event to the root
			 * component and a navigation is then triggered from the root component
			 */
			this.getOwnerComponent().fireEvent("toProduct", {
				productID: sProductID
			});
		}
	});
});
