/*
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","./HTMLViewSerializer","./XMLViewSerializer","sap/base/assert"],function(e,i,t,r){"use strict";var o=e.extend("sap.ui.core.util.serializer.ViewSerializer",{constructor:function(i,t,r){e.apply(this);this._oRootControl=i;this._oWindow=t||window;this._mViews={};this._sDefaultXmlNamespace=r}});o.prototype.serializeToXML=function(){return this.serialize("XML")};o.prototype.serializeToHTML=function(){return this.serialize("HTML")};o.prototype.serialize=function(e){this._mViews={};this._sConvertToViewType=e||undefined;return this._serializeRecursive(this._oRootControl)};o.prototype._getViewType=function(e){if(!this._sConvertToViewType){if(e instanceof this._oWindow.sap.ui.core.mvc.HTMLView){return"HTML"}else if(e instanceof this._oWindow.sap.ui.core.mvc.XMLView){return"XML"}}return this._sConvertToViewType};o.prototype._serializeRecursive=function(e){r(typeof e!=="undefined","The control must not be undefined");if(e instanceof this._oWindow.sap.ui.core.mvc.View){var i=this._getViewSerializer(e,this._getViewType(e));if(i){var t=e.getViewName()||e.getControllerName();if(!this._mViews[t]){this._mViews[t]=i.serialize(this._getViewType(e))}}}if(e.getMetadata().getClass()===this._oWindow.sap.ui.core.UIArea){var o=e.getContent();for(var n=0;n<o.length;n++){this._serializeRecursive(o[n])}}else if(e.getMetadata().getClass()===this._oWindow.sap.ui.core.ComponentContainer){this._serializeRecursive(e.getComponentInstance().getRootControl())}else{var s=e.getMetadata().getAllAggregations();if(s){for(var a in s){var u=s[a];var l=e[u._sGetter]();if(l&&l.length){for(var n=0;n<l.length;n++){var c=l[n];if(c instanceof this._oWindow.sap.ui.core.Element){this._serializeRecursive(c)}}}else if(l instanceof this._oWindow.sap.ui.core.Element){this._serializeRecursive(l)}}}}return this._mViews};o.prototype._getViewSerializer=function(e,r){var o=function(i){if(i.fFunction&&i.fFunction._sapui_handlerName){var t=i.fFunction._sapui_handlerName;var r=e.getController();if(r[t]||sap.ui.getCore().getConfiguration().getControllerCodeDeactivated()){return t}}};var n=function(i){if(i._sapui_controlId){return i._sapui_controlId}return i.getId().replace(e.createId(""),"")};if(r==="HTML"){return new i(e,this._oWindow,n,o)}else if(r==="XML"){return new t(e,this._oWindow,this._sDefaultXmlNamespace,n,o)}else{var r=e?e.constructor:"?";throw Error("View type '"+r+"' is not supported for conversion. Only HTML and XML is supported")}};return o});