/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,t){var a,s=t.getItems(),n=t.getExpanded(),r=[],i=false;s.forEach(function(e){if(e.getVisible()){r.push(e);if(e.getIcon()){i=true}}});e.openStart("ul",t);var o=t.getWidth();if(o&&n){e.style("width",o)}e.class("sapTntNavLI");if(!n){e.class("sapTntNavLICollapsed")}if(!i){e.class("sapTntNavLINoIcons")}a=!n||t.hasStyleClass("sapTntNavLIPopup")?"menubar":"tree";e.attr("role",a);e.openEnd();r.forEach(function(a){a.render(e,t)});e.close("ul")};return e},true);