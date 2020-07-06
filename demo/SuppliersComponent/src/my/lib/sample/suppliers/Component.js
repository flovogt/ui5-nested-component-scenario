sap.ui.define(["my/lib/sample/base/BaseComponent"], function(BaseComponent) {
	"use strict";

	return BaseComponent.extend("my.lib.sample.suppliers.Component", {
		metadata: {
			manifest: "json"
		},
		eventMappings: {
			productsComponent: [{
				name: "toProduct",
				forward: "toProduct"
			}]
		}
	});
});
