/*!
* OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/ui/test/Opa","sap/ui/test/OpaPlugin","sap/ui/test/PageObjectFactory","sap/ui/base/Object","sap/ui/test/launchers/iFrameLauncher","sap/ui/test/launchers/componentLauncher","sap/ui/core/routing/HashChanger","sap/ui/test/matchers/Matcher","sap/ui/test/matchers/AggregationFilled","sap/ui/test/matchers/PropertyStrictEquals","sap/ui/test/pipelines/ActionPipeline","sap/ui/test/_ParameterValidator","sap/ui/test/_OpaLogger","sap/ui/thirdparty/URI","sap/ui/base/EventProvider","sap/ui/qunit/QUnitUtils","sap/ui/test/autowaiter/_autoWaiter","sap/ui/dom/includeStylesheet","sap/ui/thirdparty/jquery","sap/ui/test/_OpaUriParameterParser","sap/ui/test/_ValidationParameters","sap/base/util/extend","sap/base/util/isPlainObject"],function(t,e,r,n,i,a,o,s,u,c,p,f,h,l,d,g,v,w,m,y,_,x,F){"use strict";var E=h.getLogger("sap.ui.test.Opa5"),O=new p,b="OpaFrame",P=new f({errorPrefix:"sap.ui.test.Opa5#waitFor"}),A=Object.keys(_.OPA5_WAITFOR_CONFIG),C=Object.keys(_.OPA_WAITFOR),W=[],I=new d;var L=n.extend("sap.ui.test.Opa5",x({},t.prototype,{constructor:function(){t.apply(this,arguments)}}));L._appUriParams=y._getAppParams();L._allUriParams=(new l).search(true);L._oPlugin=new e;function U(){var e={};var r=["source","timeout","autoWait","width","height"];if(arguments.length===1&&F(arguments[0])){e=arguments[0]}else{var n=arguments;r.forEach(function(t,r){e[t]=n[r]})}if(e.source&&typeof e.source!=="string"){e.source=e.source.toString()}var a=new l(e.source?e.source:"");a.search(x(a.search(true),t.config.appParams));var o=T();o.success=function(){S({source:a.toString(),width:e.width||t.config.frameWidth,height:e.height||t.config.frameHeight})};this.waitFor(o);var s=T();s.check=i.hasLaunched;s.timeout=e.timeout||80;s.errorMessage="unable to load the IFrame with the url: "+e.source;this.waitFor(s);var u=T();u.success=function(){this._loadExtensions(i.getWindow())}.bind(this);this.waitFor(u);var c=T();c.autoWait=e.autoWait||false;c.timeout=e.timeout||80;return this.waitFor(c)}L.prototype.iStartMyUIComponent=function e(r){var n=this;r=r||{};var i=T();i.success=function(){var e=new l;e.search(x(e.search(true),t.config.appParams));window.history.replaceState({},"",e.toString())};this.waitFor(i);var s=T();s.success=function(){var e=sap.ui.require.toUrl("sap/ui/test/OpaCss")+".css";w(e);o.getInstance().setHash(r.hash||"");var i=T();i.errorMessage="Unable to load the component with the name: "+r.componentConfig.name;if(r.timeout){i.timeout=r.timeout}t.prototype._schedulePromiseOnFlow.call(n,a.start(r.componentConfig),i)};this.waitFor(s);var u=T();u.success=function(){this._loadExtensions(window)}.bind(this);this.waitFor(u);var c=T();c.autoWait=r.autoWait||false;c.timeout=r.timeout||80;return this.waitFor(c)};L.prototype.iTeardownMyUIComponent=function t(){var e=T();e.success=function(){a.teardown()};var r=T();r.success=function(){var t=new l;t.search(L._allUriParams);window.history.replaceState({},"",t.toString())};return m.when(this.waitFor(e),this.waitFor(r))};L.prototype.iTeardownMyApp=function(){var t=this;var e=T();e.success=function(){t._unloadExtensions(L.getWindow())};var r=T();r.success=function(){if(i.hasLaunched()){this.iTeardownMyAppFrame()}else if(a.hasLaunched()){this.iTeardownMyUIComponent()}else{var t="A teardown was called but there was nothing to tear down use iStartMyComponent or iStartMyAppInAFrame";E.error(t,"Opa");throw new Error(t)}}.bind(this);return m.when(this.waitFor(e),this.waitFor(r))};L.iStartMyAppInAFrame=U;L.prototype.iStartMyAppInAFrame=U;function M(){var t=T();t.success=function(){i.teardown()};return this.waitFor(t)}L.iTeardownMyAppFrame=M;L.prototype.iTeardownMyAppFrame=M;L.prototype.hasAppStartedInAFrame=function(){return i.hasLaunched()};L.prototype.hasUIComponentStarted=function(){return a.hasLaunched()};L.prototype.hasAppStarted=function(){return i.hasLaunched()||a.hasLaunched()};L.prototype.waitFor=function(r){var n=j(r);var a=N(r,n);if(a){a.success=function(t){var e=Array.isArray(t)?t[0]:t;var i=q(r,n,e);return L.prototype.waitFor.call(this,i)};return L.prototype.waitFor.call(this,a)}var o=r.actions,s=t._createFilteredConfig(A),u;r=x({},s,r);r.actions=o;P.validate({validationInfo:_.OPA5_WAITFOR,inputToValidate:r});var c=r.check,p=null,f=r.success,h,l;u=t._createFilteredOptions(C,r);u.check=function(){var t=!!r.actions||r.autoWait;var n=L._getAutoWaiter();n.extendConfig(r.autoWait);if(t&&n.hasToWait()){return false}var a=L.getPlugin();var o=x({},r,{interactable:t||r.interactable});h=a._getFilteredControls(o,p);if(i.hasLaunched()&&Array.isArray(h)){var s=[];h.forEach(function(t){s.push(t)});h=s}if(h===e.FILTER_FOUND_NO_CONTROLS){E.debug("Matchers found no controls so check function will be skipped");return false}if(c){return this._executeCheck(c,h)}return true};u.success=function(){var e=t._getWaitForCounter();if(o&&(h||!l)){O.process({actions:o,control:h})}if(!f){return}var n=[];if(h){n.push(h)}if(e.get()===0){E.timestamp("opa.waitFor.success");E.debug("Execute success handler");f.apply(this,n);return}var i=T();if(F(r.autoWait)){i.autoWait=x({},r.autoWait)}else{i.autoWait=r.autoWait}i.success=function(){f.apply(this,n)};this.waitFor(i)};return t.prototype.waitFor.call(this,u)};L.getPlugin=function(){return i.getPlugin()||L._oPlugin};L.getJQuery=function(){return i.getJQuery()||m};L.getWindow=function(){return i.getWindow()||window};L.getUtils=function(){return i.getUtils()||g};L.getHashChanger=function(){return i.getHashChanger()||o.getInstance()};L._getAutoWaiter=function(){return i._getAutoWaiter()||v};L.extendConfig=function(e){t.extendConfig(e);t.extendConfig({appParams:L._appUriParams});L._getAutoWaiter().extendConfig(e.autoWait)};L.resetConfig=function(){t.resetConfig();t.extendConfig({viewNamespace:"",arrangements:new L,actions:new L,assertions:new L,visible:true,enabled:undefined,editable:undefined,autoWait:false,_stackDropCount:1});t.extendConfig({appParams:L._appUriParams})};L.getTestLibConfig=function(e){return t.config.testLibs&&t.config.testLibs[e]?t.config.testLibs[e]:{}};L.emptyQueue=t.emptyQueue;L.stopQueue=t.stopQueue;L.getContext=t.getContext;L.matchers={};L.matchers.Matcher=s;L.matchers.AggregationFilled=u;L.matchers.PropertyStrictEquals=c;L.createPageObjects=function(t){for(var e in t){var n=t[e];if(typeof n.actions==="function"){n.actions=k(n.actions)}if(typeof n.assertions==="function"){n.assertions=k(n.assertions)}}return r.create(t,L)};L.prototype._executeCheck=function(t,e){var r=[];e&&r.push(e);E.debug("Executing OPA check function on controls "+e);E.debug("Check function is:\n"+t);var n=t.apply(this,r);E.debug("Result of check function is: "+n||"not defined or null");return n};L.prototype.iWaitForPromise=function(e){var r=T();return t.prototype._schedulePromiseOnFlow.call(this,e,r)};L.resetConfig();function S(e){var r=sap.ui.require.toUrl("sap/ui/test/OpaCss")+".css";w(r);var n=x({},e,{frameId:b,opaLogLevel:t.config.logLevel,disableHistoryOverride:t.config.disableHistoryOverride});return i.launch(n)}function T(){return{viewName:null,controlType:null,id:null,searchOpenDialogs:false,autoWait:false}}function k(t){var e={};function r(t){Object.getOwnPropertyNames(t).filter(function(e){return e!=="constructor"&&typeof t[e]==="function"}).forEach(function(r){e[r]=t[r]})}r(t.prototype);r(t);return e}m(function(){if(m("#"+b).length){S()}m("body").addClass("sapUiBody");m("html").height("100%")});L._getEventProvider=function(){return I};L.prototype._loadExtensions=function(e){var r=t.config.extensions?t.config.extensions:[];var n=m.when.apply(m,m.map(r,function(t){var r=m.Deferred();e.sap.ui.require([t],function(n){var i=new n;i.name=i.getMetadata?i.getMetadata().getName():t;this._executeExtensionOnAfterInit(i,e).done(function(){L._getEventProvider().fireEvent("onExtensionAfterInit",{extension:i,appWindow:e});this._addExtension(i);r.resolve()}.bind(this)).fail(function(t){E.error(new Error("Error during extension init: "+t),"Opa");r.resolve()})}.bind(this));return r.promise()}.bind(this)));return this.iWaitForPromise(n)};L.prototype._unloadExtensions=function(t){var e=this;var r=m.when.apply(m,m.map(this._getExtensions(),function(r){var n=m.Deferred();L._getEventProvider().fireEvent("onExtensionBeforeExit",{extension:r});e._executeExtensionOnBeforeExit(r,t).done(function(){n.resolve()}).fail(function(t){E.error(new Error("Error during extension init: "+t),"Opa");n.resolve()});return n.promise()}));this.iWaitForPromise(r)};L.prototype._addExtension=function(t){W.push(t)};L.prototype._getExtensions=function(){return W};L.prototype._executeExtensionOnAfterInit=function(t,e){var r=m.Deferred();var n=t.onAfterInit;if(n){n.bind(e)().done(function(){r.resolve()}).fail(function(e){r.reject(new Error("Error while waiting for extension: "+t.name+" to init, details: "+e))})}else{r.resolve()}return r.promise()};L.prototype._executeExtensionOnBeforeExit=function(t,e){var r=m.Deferred();var n=t.onBeforeExit;if(n){n.bind(e)().done(function(){r.resolve()}).fail(function(e){r.reject(new Error("Error while waiting for extension: "+t.name+" to exit, details: "+e))})}else{r.resolve()}return r.promise()};function j(t){var e;["ancestor","descendant","sibling"].forEach(function(r){if(t[r]&&F(t[r])){e=[r]}else if(t.matchers&&t.matchers[r]&&F(t.matchers[r])){e=["matchers",r]}});return e}function N(t,e){if(e){var r=t;e.forEach(function(t){if(r[t]!==undefined){r=r[t]}});return r}}function q(t,e,r){if(e){var n=x({},t);var i=n;var a=0;while(a<e.length-1){i=n[e[a++]]}i[e[a]]=r;return n}}return L});
//# sourceMappingURL=Opa5.js.map