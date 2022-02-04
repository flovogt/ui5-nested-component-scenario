/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/m/library"],function(e,t){"use strict";var a=t.BackgroundHelper;var o=e.TitleLevel;var l={apiVersion:2};l.render=function(e,t){var r=t.getTitleLevel()===o.Auto?o.H1:t.getTitleLevel();r=r.toLowerCase();e.openStart("div",t);e.class("sapMShell");if(t.getAppWidthLimited()){e.class("sapMShellAppWidthLimited")}a.addBackgroundColorStyles(e,t.getBackgroundColor(),t.getBackgroundImage(),"sapMShellGlobalOuterBackground");var n=t.getTooltip_AsString();if(n){e.attr("title",n)}e.openEnd();a.renderBackgroundImageTag(e,t,["sapContrastPlus","sapMShellBG","sapUiGlobalBackgroundImageForce"],t.getBackgroundImage(),t.getBackgroundRepeat(),t.getBackgroundOpacity());e.openStart("div");e.class("sapMShellBrandingBar");e.openEnd();e.close("div");e.openStart("div");e.class("sapMShellCentralBox");e.openEnd();var s="",d="";if(!t.getBackgroundImage()){s="sapMShellBackgroundColorOnlyIfDefault";d="sapUiGlobalBackgroundImageOnlyIfDefault"}e.openStart("header",t.getId()+"-hdr");e.class("sapMShellHeader");e.class(s);e.openEnd();e.openStart("div");e.class(d);e.openEnd();e.close("div");l.renderLogoImage(e,t);if(t.getTitle()){e.openStart(r,t.getId()+"-hdrTxt");e.class("sapMShellHeaderText");e.openEnd();e.text(t.getTitle());e.close(r)}e.openStart("span");e.class("sapMShellHeaderRight");e.openEnd();e.openStart("span",t.getId()+"-hdrRightTxt");if(!t.getHeaderRightText()){e.style("display","none")}e.class("sapMShellHeaderRightText");e.openEnd();e.text(t.getHeaderRightText());e.close("span");if(t.getShowLogout()){var g=sap.ui.getCore().getLibraryResourceBundle("sap.m");e.openStart("a",t.getId()+"-logout");e.attr("tabindex","0");e.attr("role","button");e.class("sapMShellHeaderLogout");e.openEnd();e.text(g.getText("SHELL_LOGOUT"));e.close("a")}e.close("span");e.close("header");e.openStart("div",t.getId()+"-content");e.attr("data-sap-ui-root-content","true");e.class("sapMShellContent");e.class("sapMShellGlobalInnerBackground");e.openEnd();e.renderControl(t.getApp());e.close("div");e.close("div");e.close("div")};l.renderLogoImage=function(e,t){if(t._getImageSrc()){e.openStart("div");e.class("sapMShellLogo");e.openEnd();e.renderControl(t._getImage());e.close("div")}};return l},true);