sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log"
], (Controller, Log) => {
	"use strict";

	return Controller.extend("my.lib.sample.base.BaseController", {
		base64StringToImage(picture) {
			return picture ? `data:image/bmp;base64,${  picture}` : null;
		},
		onInit() {
			Log.info(this.getView().getControllerName(), "onInit");
		}
	});
});
