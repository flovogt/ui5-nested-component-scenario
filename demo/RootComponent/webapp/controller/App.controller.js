sap.ui.define([
	"my/lib/sample/base/BaseController",
	"sap/base/Log",
	"sap/ui/model/json/JSONModel"
], (Controller, Log, JSONModel) =>{
	"use strict";
	return Controller.extend("my.lib.sample.root.controller.App", {
		onInit(){
			Log.info(this.getView().getControllerName(), "onInit");

			this.getOwnerComponent().getRouter().attachRouteMatched(this._onRouteMatched, this);
			this.getOwnerComponent().getRouter().attachBypassed(this._onBypassed, this);

			const oTitlesModel = new JSONModel();
			this.getView().setModel(oTitlesModel, "titleModel");
			this.getOwnerComponent().getRouter().attachTitleChanged((oEvent) => {
				oTitlesModel.setData(oEvent.getParameters());
			});
		},

		_onRouteMatched(oEvent) {
			Log.info(this.getView().getControllerName(), "_onRouteMatched");
			const oConfig = oEvent.getParameter("config");

			// Select the corresponding item in the left menu
			this.setSelectedMenuItem(oConfig.name);
		},

		setSelectedMenuItem(sKey) {
			this.byId("navigationList").setSelectedKey(sKey);
		},

		_onBypassed(oEvent) {
			const sHash = oEvent.getParameter("hash");
			Log.info(
				this.getView().getControllerName(),
				`_onBypassed Hash=${  sHash}`
			);
		},

		onItemSelect(oEvent) {
			const sKey = oEvent.getParameter("item").getKey();
			Log.info(this.getView().getControllerName(), `onItemSelect Key=${  sKey}`);

			this.getOwnerComponent().getRouter().navTo(sKey);
		}
	});
});
