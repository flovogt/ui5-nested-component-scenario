sap.ui.define([
	"my/lib/sample/base/Component"
], (Component) => {
		"use strict";

		return Component.extend("my.lib.sample.root.Component", {
			metadata: {
				manifest: "json",
				interfaces: [
					"sap.ui.core.IAsyncContentCreation"
				]
			},
			/*
			 * Define the events which are fired from the reuse components
			 * 
			 * this component registers handler to those events and navigates
			 * to the other reuse components
			 * 
			 * see the implementation in Component for processing the event
			 * mapping
			 */
			eventMappings: {
				suppliersComponent: [{
					name: "toProduct",
					route: "productsRoute",
					componentTargetInfo: {
						productsTarget: {
							route: "detailRoute",
							parameters: {
								id: "productID"
							}
						}
					}
				}],
				productsComponent: [{
					name: "toSupplier",
					route: "suppliersRoute",
					componentTargetInfo: {
						suppliersTarget: {
							route: "detailRoute",
							parameters: {
								id: "supplierID"
							},
							componentTargetInfo: {
								productsTarget: {
									route: "listRoute",
									parameters: {
										basepath: "supplierKey"
									}
								}
							}
						}
					}
				}, {
					name: "toCategory",
					route: "categoriesRoute",
					componentTargetInfo: {
						categoriesTarget: {
							route: "detailRoute",
							parameters: {
								id: "categoryID"
							},
							componentTargetInfo: {
								productsTarget: {
									route: "listRoute",
									parameters: {
										basepath: "categoryKey"
									}
								}
							}
						}
					}
				}, {
					name: "toProduct",
					route: "productsRoute",
					componentTargetInfo: {
						productsTarget: {
							route: "detailRoute",
							parameters: {
								id: "productID"
							}
						}
					}
				}],
				categoriesComponent: [{
					name: "toProduct",
					route: "productsRoute",
					componentTargetInfo: {
						productsTarget: {
							route: "detailRoute",
							parameters: {
								id: "productID"
							}
						}
					}
				}]
			},
			init(...args) {
				// Call the init function of the parent
				Component.prototype.init.apply(this, args);
			},
		});
	}
);
