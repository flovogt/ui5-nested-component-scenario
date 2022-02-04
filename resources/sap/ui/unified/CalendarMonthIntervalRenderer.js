/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,t){var a=t.getId();var n=t.getTooltip_AsString();e.openStart("div",t);e.class("sapUiCal");e.class("sapUiCalInt");e.class("sapUiCalMonthInt");if(t._getShowItemHeader()){e.class("sapUiCalIntHead")}var i=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");var o={labelledby:{value:"",append:false}};if(t._bPoupupMode){o["role"]="dialog"}e.accessibilityState(t,o);if(n){e.attr("title",n)}var s=t.getWidth();if(s&&s!=""){e.style("width",s)}e.openEnd();var r=t.getAggregation("header");e.renderControl(r);e.openStart("div",a+"-content");e.class("sapUiCalContent");e.openEnd();e.renderControl(t.getAggregation(t.getProperty("_currentPicker")));e.close("div");e.openStart("button",a+"-cancel");e.class("sapUiCalCancel");e.attr("tabindex","-1");e.openEnd();e.text(i.getText("CALENDAR_CANCEL"));e.close("button");e.openStart("div",a+"-end");e.attr("tabindex","0");e.style("width","0");e.style("height","0");e.style("position","absolute");e.style("right","0");e.style("bottom","0");e.openEnd();e.close("div");if(t.getPickerPopup()){e.openStart("div",a+"-contentOver");e.class("sapUiCalContentOver");if(!t._oPopup||!t._oPopup.isOpen()){e.style("display","none")}e.openEnd();e.close("div")}e.close("div")};return e},true);