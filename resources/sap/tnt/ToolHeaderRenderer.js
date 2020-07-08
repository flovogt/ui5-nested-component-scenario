/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/m/OverflowToolbarRenderer","sap/m/BarInPageEnabler"],function(e,r,t){"use strict";var n=e.extend(r);n.renderBarContent=function(e,r){var o=false,a;r._getVisibleContent().forEach(function(d){a=d.getMetadata().getName()=="sap.tnt.ToolHeaderUtilitySeparator";if(!o&&a&&r._getOverflowButtonNeeded()){n.renderOverflowButton(e,r);o=true}t.addChildClassTo(d,r);e.renderControl(d)});if(!o&&r._getOverflowButtonNeeded()){n.renderOverflowButton(e,r)}};return n},true);