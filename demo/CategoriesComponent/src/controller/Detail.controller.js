sap.ui.define([
	"my/lib/sample/base/BaseController",
	"sap/base/Log"
], function(BaseController, Log) {
	"use strict";
	return BaseController.extend("my.lib.sample.categories.controller.Detail", {

		onInit: function() {
			BaseController.prototype.onInit.apply(this, arguments);
			this.getOwnerComponent().getRouter().getRoute("detailRoute").attachMatched(this._onMatched, this);
		},

		_onMatched: function(oEvent) {
			Log.info(this.getView().getControllerName(), "_onMatched");
			var oArgs = oEvent.getParameter("arguments");
			this.getOwnerComponent().getModel().metadataLoaded().then(this._bindData.bind(this, oArgs.id));
		},

		_bindData: function(id) {
			Log.info(this.getView().getControllerName(), "_bindData");
			var sObjectPath = this.getOwnerComponent().getModel().createKey("Categories", { CategoryID: id });
			this.getView().bindElement({
				path: "/" + sObjectPath,
				events: {
					change: function() {
						Log.info(this.getView().getControllerName(), "_bindData change");
						this.getView().setBusy(false);
					}.bind(this),
					dataRequested: function() {
						Log.info(this.getView().getControllerName(), "_bindData dataRequested");
						this.getView().setBusy(true);
					}.bind(this),
					dataReceived: function() {
						Log.info(this.getView().getControllerName(), "_bindData dataReceived");
						this.getView().setBusy(false);
						if (this.getView().getBindingContext() === null) {
							this.getOwnerComponent().getRouter().getTargets().display("notFound");
						}
					}.bind(this)
				}
			});
		}
	});
});
