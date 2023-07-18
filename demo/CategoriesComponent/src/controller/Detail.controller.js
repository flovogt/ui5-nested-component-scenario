sap.ui.define([
	"my/lib/sample/base/BaseController",
	"sap/base/Log"
], (BaseController, Log) => {
	"use strict";
	return BaseController.extend("my.lib.sample.categories.controller.Detail", {

		onInit(...args) {
			BaseController.prototype.onInit.apply(this, args);
			this.getOwnerComponent().getRouter().getRoute("detailRoute").attachMatched(this._onMatched, this);
		},

		_onMatched(oEvent) {
			Log.info(this.getView().getControllerName(), "_onMatched");
			const oArgs = oEvent.getParameter("arguments");
			this.getOwnerComponent().getModel().metadataLoaded().then(this._bindData.bind(this, oArgs.id));
		},

		_bindData(id) {
			Log.info(this.getView().getControllerName(), "_bindData");
			const sObjectPath = this.getOwnerComponent().getModel().createKey("Categories", { CategoryID: id }),
			 that = this;
			this.getView().bindElement({
				path: "/"+ sObjectPath,
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
		}
	});
});
