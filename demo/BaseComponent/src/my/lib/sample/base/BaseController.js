sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log"
], function(Controller, Log) {
	"use strict";

	return Controller.extend("my.lib.sample.base.BaseController", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit");
		},
		base64StringToImage: function(picture) {
			return picture ? "data:image/bmp;base64," + picture : null;
		}
	});
});
