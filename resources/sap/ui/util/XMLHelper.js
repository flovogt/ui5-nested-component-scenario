/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(e){"use strict";var r={};r.parse=function(e){var n;var t;var i=new DOMParser;n=i.parseFromString(e,"text/xml");t=r.getParseError(n);if(t){if(!n.parseError){n.parseError=t}}return n};r.getParseError=function(n){var t={errorCode:-1,url:"",reason:"unknown error",srcText:"",line:-1,linepos:-1,filepos:-1};if(e.browser.firefox&&n&&n.documentElement&&n.documentElement.tagName=="parsererror"){var i=n.documentElement.firstChild.nodeValue,o=/XML Parsing Error: (.*)\nLocation: (.*)\nLine Number (\d+), Column (\d+):(.*)/;if(o.test(i)){t.reason=RegExp.$1;t.url=RegExp.$2;t.line=parseInt(RegExp.$3);t.linepos=parseInt(RegExp.$4);t.srcText=RegExp.$5}return t}if(e.browser.webkit&&n&&n.documentElement&&n.getElementsByTagName("parsererror").length>0){var i=r.serialize(n),o=/(error|warning) on line (\d+) at column (\d+): ([^<]*)\n/;if(o.test(i)){t.reason=RegExp.$4;t.url="";t.line=parseInt(RegExp.$2);t.linepos=parseInt(RegExp.$3);t.srcText="";t.type=RegExp.$1}return t}if(!n||!n.documentElement){return t}return{errorCode:0}};r.serialize=function(e){var r=new XMLSerializer;return r.serializeToString(e)};return r});