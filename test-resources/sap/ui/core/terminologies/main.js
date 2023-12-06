/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	'sap/ui/core/Component',
	"sap/ui/core/ComponentContainer",
	"sap/ui/core/Configuration"
], function (Component, ComponentContainer, Configuration) {
	"use strict";

	var oUriParameters = new URLSearchParams(window.location.search);

	// set the default language to "de" if parameter is not present
	if (!oUriParameters.get("sap-ui-language")) {
		Configuration.setLanguage("de");
	}

	// set the manifest used
	var sManifestParam = oUriParameters.get("manifest");
	var sManifest = sManifestParam ? sManifestParam + "/manifest.appdescr" : true;
	Component.create({
		name: "sap.ui.demo.terminologies",
		manifest: sManifest
	}).then(function(oComponent) {
		var oContainer = new ComponentContainer({
			component: oComponent
		});
		oContainer.placeAt("content");
	});

});