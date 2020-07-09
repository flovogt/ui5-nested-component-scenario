sap.ui.define([
	"my/lib/sample/base/Component",
	"sap/ui/core/Component"
], function(BaseComponent, Component) {
	"use strict";
	return BaseComponent.extend("my.lib.sample.products.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			BaseComponent.prototype.init.apply(this, arguments);

			var oParentComponent = Component.getOwnerComponentFor(this);

			// if this component runs standalone instead of embedded to another component,
			// it should handle the navigation to detail page by itself. It attaches to
			// its own "toProduct" event and navigates to the detail page
			if (!oParentComponent) {
				this.attachEvent("toProduct", function(oEvent) {
					var sProductID = oEvent.getParameter("productID");
					this.getRouter().navTo("detailRoute", {
						id: sProductID
					});
				}, this);
			}
		}
	});
});
