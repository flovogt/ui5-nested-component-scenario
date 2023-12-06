/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/Eventing","sap/base/Log","sap/base/config","sap/base/i18n/Localization","sap/base/util/each","sap/base/util/LoaderExtensions","sap/ui/Device","sap/ui/Global","sap/ui/core/Lib","sap/ui/core/Theming","sap/ui/core/theming/ThemeHelper","sap/ui/dom/includeStylesheet"],function(e,t,r,a,i,s,n,u,o,c,l,m,d){"use strict";const h=new t;var f=150;var p={};var g=/\.sapUiThemeDesignerCustomCss/i;var v=0;var T="sap-ui-core-customcss";var b=false;var y=null;var L=null;var k={};var C;var E={themeLoaded:true,checkThemeApplied:function(){E.reset();U(true);if(!C){E.fireThemeApplied()}},reset:function(){E.themeLoaded=false;if(C){clearTimeout(C);C=null;v=0;L=null;k={}}},_includeLibraryThemeAndEnsureThemeRoot:function(e){var t=e.name;_(t,l.getTheme());_(t,"base");p[t]=e;if(!e.preloadedCss){E.includeLibraryTheme(t,e.variant,e)}},includeLibraryTheme:function(t,s,n){e(typeof t==="string","sLibName must be a string");e(s===undefined||typeof s==="string","sVariant must be a string or undefined");var u=n;if(typeof u==="object"){u=I(n)}if(t!="sap.ui.legacy"&&t!="sap.ui.classic"){var o=a.get({name:"sapUiXxCssVariables",type:a.Type.String,external:true});if(!s){s=""}var c=/^(true|x)$/i.test(o)?"_skeleton":"";var m=i.getRTL()?"-RTL":"";var h,f=t+(s.length>0?"-["+s+"]":s);if(t&&t.indexOf(":")==-1){h="library"+s+c+m}else{h=t.substring(t.indexOf(":")+1)+s;t=t.substring(0,t.indexOf(":"))}var p="sap-ui-theme-"+f;var g="sap-ui-themeskeleton-"+f;var v=/^(true|x|additional)$/i.test(o);if(!document.querySelector("LINK[id='"+p+"']")||v&&!document.querySelector("LINK[id='"+g+"']")){var T=new URL(E._getThemePath(t,l.getTheme()),document.baseURI).toString();var b=document.createElement("link");b.href=T+h+".css"+(u?u:"");var y=b.href;b.href=T+"css_variables.css"+(u?u:"");var L=b.href;A(p);if(v){r.info("Including "+L+" -  sap.ui.core.theming.ThemeManager.includeLibraryTheme()");d(L,p);p="sap-ui-themeskeleton-"+f;A(p)}r.info("Including "+y+" -  sap.ui.core.theming.ThemeManager.includeLibraryTheme()");d(y,p);var k=sap.ui.require("sap/ui/core/theming/Parameters");if(k){k._addLibraryTheme(f)}E.checkThemeApplied()}}},_getThemePath:function(e,t){_(e,t);return sap.ui.require.toUrl((e+".themes."+t).replace(/\./g,"/")+"/")},_updateThemeUrls:function(e,t){var r=document.querySelectorAll("link[id^=sap-ui-theme-],link[id^=sap-ui-themeskeleton-]");Array.prototype.forEach.call(r,function(r){w(r,e,t)})},_attachThemeApplied:function(e){h.attachEvent("applied",e)},_detachThemeApplied:function(e){h.detachEvent("applied",e)},fireThemeApplied:function(){m.reset();var e=sap.ui.require("sap/ui/core/theming/Parameters");if(e){e._reset(true)}h.fireEvent("applied",{theme:l.getTheme()})}};function S(){var e=l.getTheme();var t=E._getThemePath("sap.ui.core",e)+"custom.css";var a=e.indexOf("sap_")===0||e==="base";var i=true;var n=[];if(b&&y===e){p[T]={}}function u(s){var u="sap-ui-theme-"+s;var o=m.checkAndRemoveStyle({prefix:"sap-ui-theme-",id:s});if(o&&document.getElementById("sap-ui-themeskeleton-"+s)){o=m.checkAndRemoveStyle({prefix:"sap-ui-themeskeleton-",id:s})}i=i&&o;if(i){if(!b||y!=e){if(!a&&x(s)){var c=t;var l=I(p["sap.ui.core"]);if(l){c+=l}d(c,T);b=true;r.debug("ThemeManager: delivered custom CSS needs to be loaded, Theme not yet applied");y=e;i=false;return false}else if(b){var h=document.querySelector("LINK[id='"+T+"']");if(h){h.remove();r.debug("ThemeManager: Custom CSS removed")}b=false}}}if(!a&&o&&!k[s]){var f=document.getElementById(u);if(f&&f.getAttribute("data-sap-ui-ready")==="false"&&!(f.sheet&&m.hasSheetCssRules(f.sheet))){n.push(s)}}}s(p,u);if(n.length>0){if(!L){for(var o in p){var c=m.getMetadata(o);if(c&&c.Extends&&c.Extends[0]){L=c.Extends[0];break}}}if(L){n.forEach(function(t){var a="sap-ui-theme-"+t;var i=document.getElementById(a);r.warning("ThemeManager: Custom theme '"+e+"' could not be loaded for library '"+t+"'. "+"Falling back to its base theme '"+L+"'.");w(i,L);k[t]=true});i=false}}if(!i){r.debug("ThemeManager: Theme not yet applied.")}else{y=e}return i}function x(e){var t=window.document.getElementById("sap-ui-theme-"+e);if(!t){return false}var a=window.getComputedStyle(t,":after");var i=a?a.getPropertyValue("content"):null;if(!i&&u.browser.safari){var s=document.documentElement;s.classList.add("sapUiThemeDesignerCustomCss");i=window.getComputedStyle(s,":after").getPropertyValue("content");s.classList.remove("sapUiThemeDesignerCustomCss")}if(i&&i!=="none"){try{if(i[0]==="'"||i[0]==='"'){i=i.substring(1,i.length-1)}return i==="true"}catch(e){r.error("Custom check: Error parsing JSON string for custom.css indication.",e)}}var n=t.sheet?m.safeAccessSheetCssRules(t.sheet):null;if(!n||n.length===0){r.warning("Custom check: Failed retrieving a CSS rule from stylesheet "+e);return false}for(var o=0;o<2&&o<n.length;o++){if(g.test(n[o].selectorText)){return true}}return false}function U(e){v++;var t=v>f;if(!S()&&!t){var a;if(v<=100){a=2}else if(v<=110){a=500}else{a=1e3}C=setTimeout(U,a)}else if(!e){E.reset();E.themeLoaded=true;E.fireThemeApplied();if(t){r.error("ThemeManager: max. check cycles reached.")}}else{E.themeLoaded=true}}function A(e){var t=document.getElementById(e);if(t){t.dataset.sapUiFoucmarker=e}}function R(e){var t=document.documentElement;var r=e.new;E._updateThemeUrls(r,true);t.classList.remove("sapUiTheme-"+e.old);t.classList.add("sapUiTheme-"+r);E.checkThemeApplied()}function _(e,t){var r=l.getThemeRoot(t,e);if(r){r=r+(r.slice(-1)=="/"?"":"/")+e.replace(/\./g,"/")+"/themes/"+t+"/";n.registerResourcePath((e+".themes."+t).replace(/\./g,"/"),r)}}function w(e,t,r){var a,s=e.href.search(/[?#]/),n,u,o="library",c=i.getRTL()?"-RTL":"",l,m;var h=/^sap-ui-theme(?:skeleton)?-(.*)$/i.exec(e.id);if(Array.isArray(h)){a=h[1]}else{a=e.id.slice(13)}p[a]=p[a]||{};if(s>-1){n=e.href.substring(0,s);u=e.href.substring(s)}else{n=e.href;u=""}n=n.substring(n.lastIndexOf("/")+1);if((m=a.indexOf("-["))>0){o+=a.slice(m+2,-1);a=a.slice(0,m)}if(n===o+".css"||n===o+"-RTL.css"){n=o+c+".css"}l=new URL(E._getThemePath(a,t)+n+u,document.baseURI).toString();if(l!=e.href){if(r){e.dataset.sapUiFoucmarker=e.id}d(l,e.id)}}function I(e){var t;if(c.getVersionedLibCss()&&e){t="?version="+e.version;if(o.versioninfo){t+="&sap-ui-dist-version="+o.versioninfo.version}}return t}document.documentElement.classList.add("sapUiTheme-"+l.getTheme());r.info("Declared theme "+l.getTheme(),null);l.attachChange(function(e){var t=e.themeRoots;var r=e.theme;if(t&&t.forceUpdate){E._updateThemeUrls(l.getTheme())}if(r){R(r)}});l.registerThemeManager(E);return E});
//# sourceMappingURL=ThemeManager.js.map