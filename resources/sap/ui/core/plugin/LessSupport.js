/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";function e(){sap.ui.define("sap/ui/core/plugin/LessSupport",["sap/ui/thirdparty/jquery","sap/ui/core/theming/ThemeManager","sap/ui/core/theming/ThemeHelper","sap/ui/core/Configuration","sap/base/Log","sap/base/util/syncFetch","sap/base/util/UriParameters","sap/ui/core/Core"],function(jQuery,e,t,i,s,r,n){var a="library.source";var o="library";var d;var u;var l=function(){};l.prototype.startPlugin=function(r,a){s.info("Starting LessSupport plugin.");s.warning("  NOT FOR PRODUCTIVE USAGE! LessSupport is an experimental feature which might change in future!");var o=n.fromQuery(window.location.search);var l=o.get("sap-ui-xx-noless");if(l){l=l.toLowerCase()}try{if(l!=="false"&&(window.top.JsUnit||window.sap.ui.test&&window.sap.ui.test.qunit)){s.info("  LessSupport has been deactivated for JSUnit Testrunner or QUnit.");return}}catch(e){}if(l&&l!=="false"){s.info("  LessSupport has been deactivated by URL parameter.");return}else{s.info('  LessSupport can be deactivated by adding the following parameter to your URL: "sap-ui-xx-noless=X".')}window.less=window.less||{env:"development",relativeUrls:true,errorReporting:function(e,t,i){if(e==="add"&&window.console){window.console.error("Failed to parse: "+i,t)}}};sap.ui.requireSync("sap/ui/thirdparty/less");this.bActive=true;d=e.includeLibraryTheme;u=e.applyTheme;e.includeLibraryTheme=this.includeLibraryTheme.bind(this);e.applyTheme=this.applyTheme.bind(this);var p=this,h=false;var c=[];jQuery("link[id^=sap-ui-theme-]").each(function(){var e=p.initLink(this);h=e||h;if(e){c.push(this.id.substr(13))}});this.refreshLess(h);var f=0;function m(){var r=true;var n;for(var a=0;a<c.length;a++){n=t.checkAndRemoveStyle({prefix:"less:",id:c[a]});if(n){jQuery(document.getElementById("sap-ui-theme-"+c[a])).attr("data-sap-ui-ready","true")}r=r&&n}f++;if(f>100){r=true;s.warning("LessSupport: Max theme check cycles reached.")}if(r){e.themeLoaded=true;setTimeout(function(){e.fireThemeChanged({theme:i.getTheme()})},0)}else{p.iCheckThemeAppliedTimeout=setTimeout(m,100)}}if(h){this.iCheckThemeAppliedTimeout=setTimeout(m,100)}};l.prototype.stopPlugin=function(){s.info("Stopping LessSupport plugin.");if(this.bActive){clearTimeout(this.iCheckThemeAppliedTimeout);delete this.iCheckThemeAppliedTimeout;jQuery("link[id^=sap-ui-theme-]").each(function(){var e=this.id.substr(13);jQuery(document.getElementById("less:"+e)).remove()});e.includeLibraryTheme=d;e.applyTheme=u}};l.prototype.initLink=function(e){var t=this.updateLink(e);jQuery("<style>").attr("id","less:"+e.id.substr(13)).attr("type","text/css").attr("media",this.media||"screen").insertAfter(e);return t};l.prototype.updateLink=function(t){var r=t.id.substr(13);var n;if((n=r.indexOf("-["))>0){r=r.substr(0,n)}var d=e._getThemePath(r,i.getTheme());var u=this.getLastModified(d+a+".less");var l=this.getLastModified(d+o+".css");var p=u==0&&l>0||u>l;if(!p){var h=e._getThemePath(r,"base");var c=this.getLastModified(h+a+".less");var f=this.getLastModified(h+o+".css");p=c==0&&f>0||c>f}var m=p?a:o;s.debug("LessSupport.updateLink: "+d+m+": "+(p?"LESS":"CSS"));if(!p){if(t.title){delete t.title}t.rel="stylesheet";t.href=d+m+".css";this.unregisterLink(t);return false}t.title=r;t.rel="stylesheet/less";t.href=d+m+".less";this.registerLink(t);return true};l.prototype.getLastModified=function(e){var t;try{var i=r(e,{method:"HEAD"});if(i.ok){var n=i.headers.get("Last-Modified");t=n?Date.parse(n):0}else{throw Error("HTTP status error: "+i.status)}}catch(e){t=-1}s.debug("CSS/LESS head-check: "+e+"; last-modified: "+t);return t};l.prototype.applyTheme=function(t,i){u.call(e,t,i);var s=this,r=false;jQuery("link[id^=sap-ui-theme-]").each(function(){r=s.updateLink(this)||r});this.refreshLess(r)};l.prototype.includeLibraryTheme=function(t){d.apply(e,arguments);var i=this,s=false;jQuery("link[id='sap-ui-theme-"+t+"']").each(function(){s=i.initLink(this)||s});this.refreshLess(s)};l.prototype.registerLink=function(e){if(window.less&&window.less.sheets){var t=window.less.sheets.indexOf(e);if(t===-1){window.less.sheets.push(e)}}};l.prototype.unregisterLink=function(e){if(window.less&&window.less.sheets){var t=e.id.substr(13);var i=window.less.sheets.indexOf(e);if(i>=0){window.less.sheets.splice(i,1);jQuery(document.getElementById("less:"+t)).html("")}}};l.prototype.refreshLess=function(e){if(e){if(!document.getElementById("sap-ui-ide-less-mode")){jQuery("<span>").attr("id","sap-ui-ide-less-mode").css("position","absolute").css("right","10px").css("bottom","10px").css("padding","10px").css("border","3px solid red").css("border-radius","10px").css("opacity","0.75").css("color","black").css("background-color","white").css("font-weight","bold").css("z-index","99999").append(jQuery("<span>").text("LESS MODE").css({display:"block","text-align":"center"})).append(jQuery("<a>").attr("href","#").text("Deactivate").attr("title","Less mode is active. Click to deactivate it (requires page refresh).").css({float:"left",clear:"left","font-size":"0.75em","text-decoration":"underline","margin-right":"0.5em"}).bind("click",function(e){e.preventDefault();if(window.confirm("Deactivating the Less Mode refreshes the page. Do you want to proceed?")){var t=window.location.search;window.location.search=(t.charAt(0)==="?"?t+"&":"?")+"sap-ui-xx-noless=true"}})).append(jQuery("<a>").attr("href","#").text("Hide").attr("title","Less mode is active. Click to hide this information.").css({float:"right","font-size":"0.75em","text-decoration":"underline"}).bind("click",function(e){e.preventDefault();jQuery(this).parent().css("display","none")})).appendTo(window.document.body)}}else{jQuery("#sap-ui-ide-less-mode").remove()}if(window.less&&window.less.refresh&&window.less.sheets.length>0){var t={};var i={};jQuery(window.less.sheets).each(function(){i[this.href]=jQuery(this).attr("id").substr(13)});var r=window.less.tree.Rule.prototype.eval;window.less.tree.Rule.prototype.eval=function(e){if(this.variable&&typeof this.name==="string"&&this.name.indexOf("@_PRIVATE_")!==0){var n=i[this.currentFileInfo.rootFilename];if(!n){s.warning("LessSupport: could not find libary ("+this.currentFileInfo.rootFilename+")")}var a=t[n];if(!a){a=t[n]={}}try{a[this.name.substr(1)]=this.value.eval(e).toCSS(e)}catch(e){}}return r.apply(this,arguments)};window.less.refresh();var n=sap.ui.requireSync("sap/ui/core/theming/Parameters");n._setOrLoadParameters(t);window.less.tree.Rule.prototype.eval=r}};var p=new l;sap.ui.getCore().registerPlugin(p);l.refresh=function(){p.refreshLess(true);e.checkThemeChanged()};return l},true)}if(!(window.sap&&window.sap.ui&&window.sap.ui.define)){var t=function(){document.removeEventListener("DOMContentLoaded",t,false);e()};document.addEventListener("DOMContentLoaded",t,false)}else{e()}})();
//# sourceMappingURL=LessSupport.js.map