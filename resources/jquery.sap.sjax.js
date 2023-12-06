/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(jQuery){"use strict";jQuery.sap.sjaxSettings={complexResult:true,fallback:undefined};jQuery.sap.sjax=function t(s){var a;var e=jQuery.extend(true,{},jQuery.sap.sjaxSettings,s,{async:false,success:function(t,s,e){a={success:true,data:t,status:s,statusCode:e&&e.status}},error:function(t,s,e){a={success:false,data:undefined,status:s,error:e,statusCode:t.status,errorResponse:t.responseText}}});jQuery.ajax(e);if(!e.complexResult){return a.success?a.data:e.fallback}return a};jQuery.sap.syncHead=function(t){return jQuery.sap.sjax({type:"HEAD",url:t}).success};jQuery.sap.syncGet=function t(s,a,e){return jQuery.sap.sjax({url:s,data:a,type:"GET",dataType:e||"text"})};jQuery.sap.syncPost=function t(s,a,e){return jQuery.sap.sjax({url:s,data:a,type:"POST",dataType:e||"text"})};jQuery.sap.syncGetText=function t(s,a,e){return jQuery.sap.sjax({url:s,data:a,type:"GET",dataType:"text",fallback:e,complexResult:arguments.length<3})};jQuery.sap.syncGetJSON=function t(s,a,e){return jQuery.sap.sjax({url:s,data:a||null,type:"GET",dataType:"json",fallback:e,complexResult:arguments.length<3})};return jQuery});
//# sourceMappingURL=jquery.sap.sjax.js.map