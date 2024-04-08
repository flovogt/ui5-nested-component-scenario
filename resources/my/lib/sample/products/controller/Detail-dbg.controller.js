sap.ui.define([
	"my/lib/sample/base/BaseController",
	"sap/base/Log"
], (BaseController, Log) => {
	"use strict";
	return BaseController.extend("my.lib.sample.products.controller.Detail", {

		onInit(...args) {
			BaseController.prototype.onInit.apply(this, args);
			this.getOwnerComponent().getRouter().getRoute("detailRoute").attachPatternMatched(this._onMatched, this);
		},

		_onMatched(oEvent) {
			Log.info(this.getView().getControllerName(), "_onMatched");
			const oArgs = oEvent.getParameter("arguments");
			this.getOwnerComponent().getModel().metadataLoaded().then(this._bindData.bind(this, oArgs.id));
		},

		_bindData(id) {
			Log.info(this.getView().getControllerName(), "_bindData");

			const sObjectPath = this.getOwnerComponent().getModel().createKey("Products", { ProductID: id }),
			 that = this;

			this.getView().bindElement({
				path: "/"+ sObjectPath,
				parameters: {
					expand: "Supplier,Category"
				},
				events: {
					change() {
						Log.info(that.getView().getControllerName(), "_bindData change");
						that.getView().setBusy(false);
					},
					dataRequested() {
						Log.info(that.getView().getControllerName(), "_bindData dataRequested");
						that.getView().setBusy(true);
					},
					dataReceived() {
						Log.info(that.getView().getControllerName(), "_bindData dataReceived");
						that.getView().setBusy(false);
						if (that.getView().getBindingContext() === null) {
							that.getOwnerComponent().getRouter().getTargets().display("notFound");
						}
					}
				}
			});
		},

		onPressSupplier(oEvent) {
			Log.info(this.getView().getControllerName(), `onPressSupplier ${  oEvent.getSource().getBindingContext().getObject().SupplierID}`);

			const oOwnerComponent = this.getOwnerComponent(),
			 oModel = oOwnerComponent.getModel(),
			 oBindingContext = oEvent.getSource().getBindingContext(),
			 sSupplierID = oBindingContext.getProperty("SupplierID");

			oOwnerComponent.fireEvent("toSupplier", {
				supplierID: sSupplierID,
				supplierKey: encodeURIComponent(`/${  oModel.createKey("Suppliers", {
					SupplierID: sSupplierID
				})}`)
			});
		},

		onPressCategory(oEvent) {
			Log.info(this.getView().getControllerName(), `onPressCategory ${  oEvent.getSource().getBindingContext().getObject().CategoryID}`);

			const oOwnerComponent = this.getOwnerComponent(),
			 oModel = oOwnerComponent.getModel(),
			 oBindingContext = oEvent.getSource().getBindingContext(),
			 sCategoryID = oBindingContext.getProperty("CategoryID");

			oOwnerComponent.fireEvent("toCategory", {
				categoryID: sCategoryID,
				categoryKey: encodeURIComponent(`/${  oModel.createKey("Categories", {
					CategoryID: sCategoryID
				})}`)
			});
		}
	});
});
