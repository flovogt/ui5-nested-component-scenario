/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library","sap/ui/core/mvc/View","sap/ui/core/mvc/Controller"],function(e,t,o){"use strict";var n=e.Categories;var i=e.Severity;var r=e.Audiences;var a=["jQuery.sap.require","$.sap.require","sap.ui.requireSync","jQuery.sap.sjax"];if(jQuery&&jQuery.sap&&Object.getOwnPropertyDescriptor(jQuery.sap,"sjax").value){a.push("jQuery.sap.syncHead","jQuery.sap.syncGet","jQuery.sap.syncPost","jQuery.sap.syncGetText","jQuery.sap.syncGetJSON")}var s={id:"controllerSyncCodeCheck",audiences:[r.Internal],categories:[n.Consistency],enabled:true,minversion:"1.32",title:"Synchronous calls in controller code",description:"Synchronous calls are deprecated within the Google Chrome browser and block the UI.",resolution:"Use asynchronous XHR calls instead",resolutionurls:[{text:"Documentation: Loading a Module",href:"https://sapui5.hana.ondemand.com/#/topic/d12024e38385472a89c1ad204e1edb48"}],check:function(e,n,r){var s=r.getElementsByClassName(t);var c=[];s.forEach(function(e){if(e.getController){var t=e.getController();if(t){c.push({controller:t,viewId:e.getId()})}}});var u=function(e,t,o,n){var i=[];Object.keys(e).forEach(function(i){var r=e[i].toString().replace(/(\r\n|\n|\r)/gm,"");o.forEach(function(o){if(r.indexOf(o)>0){n(e.getMetadata().getName(),i,o,t)}})});return i};var d={};c.forEach(function(e){var t=function(e,t,o,n){d[n]=d[n]||[];d[n].push({controllerName:e,functionName:t,invalidContent:o})};var n=e.controller;while(n){u(n,e.viewId,a,t);var i=Object.getPrototypeOf(n);if(n===i||i===o.prototype){break}n=i}});Object.keys(d).forEach(function(t){var o=d[t];e.addIssue({severity:i.Medium,details:o.map(function(e){return"Synchronous call "+e.invalidContent+" found in "+e.controllerName+"#"+e.functionName}).reduce(function(e,t){return e+"\n"+t}),context:{id:t}})})}};var c={id:"globalApiUsage",audiences:[r.Internal],categories:[n.Modularization],enabled:true,minversion:"1.58",title:"Call of deprecated global API",description:"Calls of deprecated global API without declaring the according dependency should be avoided.",resolution:"Declare the dependency properly or even better: Migrate to the modern module API as documented.",resolutionurls:[{text:"Documentation: Modularization",href:"https://openui5.hana.ondemand.com/#/api"}],check:function(e,t,o){var n=o.getLoggedObjects("jquery.sap.stubs");n.forEach(function(t){e.addIssue({severity:i.High,details:t.message,context:{id:"WEBPAGE"}})})}};var u={id:"jquerySapUsage",audiences:[r.Internal],categories:[n.Modularization],enabled:true,minversion:"1.58",async:true,title:"Usage of deprecated jquery.sap module",description:"Usage of deprecated jquery.sap API should be avoided and dependencies to jquery.sap "+"are not needed any longer. This rule only works on global execution scope.",resolution:"Migrate to the modern module API as documented.",resolutionurls:[{text:"Documentation: Modularization",href:"https://openui5.hana.ondemand.com/#/topic/a075ed88ef324261bca41813a6ac4a1c"}],check:function(e,t,o,n){if(o.getType()==="global"){sap.ui.require(["sap/base/util/LoaderExtensions"],function(t){var o="Usage of deprecated jquery.sap modules detected: \n"+t.getAllRequiredModules().filter(function(e){return e.startsWith("jquery.sap")}).reduce(function(e,t){return e+"\t- "+t+"\n"},"");e.addIssue({severity:i.Medium,details:o,context:{id:"WEBPAGE"}});n()})}}};var d={id:"syncFactoryLoading",audiences:[r.Internal],categories:[n.Modularization],enabled:true,minversion:"1.58",title:"Usage of deprecated synchronous factories",description:"Usage of deprecated synchronous factories",resolution:"Avoid using synchronous factory functions. Use the create() and/or load() functions of the respective modules instead. For example: View.create(...) or Component.load(). Migrate to the modern module API as documented.",resolutionurls:[{text:"Documentation: Legacy Factories Replacement",href:"https://openui5.hana.ondemand.com/#/topic/491bd9c70b9f4c4d913c8c7b4a970833"}],check:function(e,t,o){var n=["sap.ui.fragment","sap.ui.xmlfragment","sap.ui.jsfragment","sap.ui.htmlfragment","sap.ui.controller","sap.ui.extensionpoint","sap.ui.component","sap.ui.view","sap.ui.template"];n.forEach(function(t){var n=o.getLoggedObjects(t);n.forEach(function(t){e.addIssue({severity:i.High,details:t.message,context:{id:"WEBPAGE"}})})})}};var l={id:"deprecatedJSViewUsage",audiences:[r.Internal],categories:[n.Modularization],enabled:true,minversion:"1.90",title:"Usage of deprecated JSView",description:"Usage of deprecated JSView",resolution:"Avoid using sap.ui.core.mvc.JSView. Instead use Typed Views by defining the view class with 'sap.ui.core.mvc.View.extend' and creating the view instances with 'sap.ui.core.mvc.View.create'.",resolutionurls:[{text:"Documentation: Typed Views",href:"https://openui5.hana.ondemand.com/#/topic/e6bb33d076dc4f23be50c082c271b9f0"}],check:function(e,t,o){var n=o.getLoggedObjects("sap.ui.core.mvc.JSView");n.forEach(function(t){e.addIssue({severity:i.High,details:t.message,context:{id:"WEBPAGE"}})})}};var p={id:"globalSyncXHR",audiences:[r.Internal],categories:[n.Consistency],enabled:true,minversion:"1.59",title:"Sending of synchronous XHR",description:"Sending synchronus XHRs has to be avoided.",resolution:"Check the details of the findings for tips to fix the issue.",resolutionurls:[{text:"Performance: Speed Up Your App",href:"https://sapui5.hana.ondemand.com/#/topic/408b40efed3c416681e1bd8cdd8910d4"},{text:"Configuration of 'sap.ui.loader'",href:"https://sapui5.hana.ondemand.com/#/api/sap.ui.loader"}],check:function(e,t,o){var n=o.getLoggedObjects("SyncXHR");n.forEach(function(t){e.addIssue({severity:i.High,details:t.message,context:{id:"WEBPAGE"}})})}};var h={id:"deprecatedApiUsage",audiences:[r.Internal],categories:[n.Modularization],enabled:true,minversion:"1.59",title:"Usage of deprecated API",description:"Usage of deprecated API should be avoided.",resolution:"Check the details of the findings for tips to fix the issue.",resolutionurls:[{text:"Documentation: Adapting to the Modularization of the Core",href:"https://openui5.hana.ondemand.com/#/topic/b8fdf0c903424c9191f142842323ae22"}],check:function(e,t,o){var n=o.getLoggedObjects("Deprecation");n.forEach(function(t){e.addIssue({severity:i.High,details:t.message,context:{id:"WEBPAGE"}})})}};var g={id:"controllerExtension",audiences:[r.Internal],categories:[n.Usage],enabled:true,minversion:"1.61",title:"Wrong usage of Controller Extension API",description:"Your controller extension definition is a subclass of sap.ui.core.mvc.Controller.",resolution:"Your controller extension module should return a plain object.",check:function(e,t,o){var n=o.getLoggedObjects("ControllerExtension");n.forEach(function(t){e.addIssue({severity:i.Medium,details:t.message,context:{id:"WEBPAGE"}})})}};var f={id:"jQueryThreeDeprecation",audiences:[r.Application,r.Control,r.Internal],categories:[n.Usage],enabled:true,minversion:"1.79",title:"Usage of deprecated jQuery API",description:"With the upgrade from jQuery 2.x to jQuery 3.x, some jQuery APIs have been deprecated and might be removed in future jQuery versions. To be future-proof for jQuery 4.x, the deprecated API calls should be removed or replaced with current alternatives.",resolution:"Please see the browser console warnings containing the string 'JQMIGRATE' to identify the code locations which cause the issue. Please also see the jQuery migration guide for further information on the deprecated APIs and their newer alternatives.",resolutionurls:[{text:"jQuery Migrate",href:"https://github.com/jquery/jquery-migrate"},{text:"jQuery 3 Upgrade Guide",href:"https://jquery.com/upgrade-guide/3.0/"},{text:"jQuery 3 Migrate warnings",href:"https://github.com/jquery/jquery-migrate"}],check:function(e,t,o){var n=o.getLoggedObjects("jQueryThreeDeprecation");n.forEach(function(t){e.addIssue({severity:i.Medium,details:t.message,context:{id:"WEBPAGE"}})})}};var m={id:"missingInitInUIComponent",audiences:[r.Application,r.Control,r.Internal],categories:[n.Functionality],enabled:true,minversion:"1.89",title:"Missing super init() call in sap.ui.core.UIComponent",description:"A sub-class of sap.ui.core.UIComponent which overrides the init() function must apply the super init() function as well.",resolution:"A bound call to sap.ui.core.UIComponent.prototype.init must be introduced in the sub-class.",resolutionurls:[{text:"API Documentation: sap.ui.core.UIComponent#init",href:"https://openui5.hana.ondemand.com/api/sap.ui.core.UIComponent#methods/init"}],check:function(e,t,o){var n=o.getLoggedObjects("missingInitInUIComponent");n.forEach(function(t){e.addIssue({severity:i.High,details:t.message,context:{id:"WEBPAGE"}})})}};var v={id:"missingSuperConstructor",audiences:[r.Application,r.Control,r.Internal],categories:[n.Functionality],enabled:true,minversion:"1.93",title:"Missing super constructor call",description:"A sub-class of sap.ui.core.Component or sap.ui.core.mvc.Controller which overrides the constructor must apply the super constructor as well.",resolution:"A bound call to sap.ui.core.Component or sap.ui.core.mvc.Controller must be introduced in the sub-class.",resolutionurls:[{text:"API Documentation: sap.ui.core.mvc.Controller",href:"https://openui5.hana.ondemand.com/api/sap.ui.core.mvc.Controller"},{text:"API Documentation: sap.ui.core.Component",href:"https://openui5.hana.ondemand.com/api/sap.ui.core.Component"}],check:function(e,t,o){var n=o.getLoggedObjects("missingSuperConstructor");n.forEach(function(t){e.addIssue({severity:i.High,details:t.message,context:{id:"WEBPAGE"}})})}};return[s,c,u,d,p,h,g,f,m,v,l]},true);