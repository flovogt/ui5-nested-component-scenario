sap.ui.define(["my/lib/sample/base/Component"], function(Component) {
	"use strict";

	return Component.extend("my.lib.sample.suppliers.Component", {
		metadata: {
			manifest: "json",
			interfaces: [
				"sap.ui.core.IAsyncContentCreation"
			]
		},
		eventMappings: {
			productsComponent: [{
				name: "toProduct",
				forward: "toProduct"
			}]
		}
	});
});
