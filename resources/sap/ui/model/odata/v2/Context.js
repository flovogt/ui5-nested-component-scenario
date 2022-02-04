/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/Context"],function(e){"use strict";var t=e.extend("sap.ui.model.odata.v2.Context",{constructor:function(t,r,i,o){e.call(this,t,r);this.oCreatePromise=undefined;this.sDeepPath=i||r;this.bForceRefresh=false;this.bPreliminary=false;this.oSyncCreatePromise=o;this.bUpdated=false}});t.prototype.created=function(){if(this.oSyncCreatePromise&&!this.oCreatePromise){this.oCreatePromise=Promise.resolve(this.oSyncCreatePromise).then(function(){})}return this.oCreatePromise};t.prototype.getDeepPath=function(){return this.sDeepPath};t.prototype.hasChanged=function(){return this.bUpdated||this.bForceRefresh};t.prototype.isPreliminary=function(){return this.bPreliminary};t.prototype.isRefreshForced=function(){return this.bForceRefresh};t.prototype.isTransient=function(){return this.oSyncCreatePromise&&this.oSyncCreatePromise.isPending()};t.prototype.isUpdated=function(){return this.bUpdated};t.prototype.setDeepPath=function(e){this.sDeepPath=e};t.prototype.setForceRefresh=function(e){this.bForceRefresh=e};t.prototype.setPreliminary=function(e){this.bPreliminary=e};t.prototype.setUpdated=function(e){this.bUpdated=e};return t},false);