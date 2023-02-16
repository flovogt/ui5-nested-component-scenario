/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/m/library","sap/base/security/URLListValidator"],function(e,t,r){"use strict";var n=t.LinkConversion;var i=e.extend("sap.m.FormattedTextAnchorGenerator",{getInterface:function(){return this}});var o=/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;()$]*[-A-Z0-9+&@#\/%=~_|])/gim;var s=/(www\.[^\s><]+(\b|$))/gim;var a="//";var c=/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+(?!\/\s\*)>/gim;var u=/<a[^>]*>([^<]+)<\/a>/gim;var f=[c,u];i.generateAnchors=function(e,t,r){if(t===n.ProtocolOnly){e=i._createAnchors(e,o,r)}if(t===n.All){e=i._createAnchors(e,o,r);e=i._createAnchors(e,s,r,a)}return e};i._createPositionObject=function(e,t){return{iStartPos:e,iEndPos:e+t}};i._isNested=function(e,t){return e.iStartPos<t.iStartPos&&e.iEndPos>t.iEndPos};i._isAllowed=function(e,t){return e.some(function(e){return i._isNested(e,t)})};i._shouldBeProcessed=function(e,t,n){return r.validate(e)&&!i._isAllowed(n,t)};i._scanForEntitiesToSkip=function(e,t){var r=[],n;while((n=e.exec(t))!==null){r.push(i._createPositionObject(n.index,n[0].length))}return r};i._getEntitiesToSkipWhileSearchingForLinks=function(e){return f.map(function(t){return i._scanForEntitiesToSkip(t,e)}).reduce(function(e,t){return e.concat(t)})};i._createAnchors=function(e,t,r,n){var o=i._getEntitiesToSkipWhileSearchingForLinks(e),s;n=n||"";s=function(e){var t=i._createPositionObject(arguments[3],e.length);if(!i._shouldBeProcessed(e,t,o)){return e}return'<a href="'+n+e+'" target="'+r+'">'+e+"</a>"};return e.replace(t,s)};return i});
//# sourceMappingURL=FormattedTextAnchorGenerator.js.map