sap.ui.define([
	"my/lib/sample/base/Component",
	"sap/ui/core/Component"
], (BaseComponent, Component) => {
	"use strict";
	return BaseComponent.extend("my.lib.sample.products.Component", {
		metadata: {
			manifest: "json",
			interfaces: [
				"sap.ui.core.IAsyncContentCreation"
			]
		},
		init(...args) {
			BaseComponent.prototype.init.apply(this, args);

			const oParentComponent = Component.getOwnerComponentFor(this);

			/*
			 * If this component runs standalone instead of embedded to another component,
			 * it should handle the navigation to detail page by itself. It attaches to
			 * its own "toProduct" event and navigates to the detail page
			 */
			if (!oParentComponent) {
				this.attachEvent("toProduct", (oEvent) => {
					const sProductID = oEvent.getParameter("productID");
					this.getRouter().navTo("detailRoute", {
						id: sProductID
					});
				}, this);
			}
		}
	});
});
