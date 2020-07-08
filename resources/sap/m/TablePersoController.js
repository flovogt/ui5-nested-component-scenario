/*
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TablePersoDialog","sap/ui/base/ManagedObject","sap/ui/base/ManagedObjectRegistry","sap/ui/core/syncStyleClass","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,i,o,a,r){"use strict";var s=t.extend("sap.m.TablePersoController",{constructor:function(e,i){t.apply(this,arguments)},metadata:{properties:{contentWidth:{type:"sap.ui.core.CSSSize",defaultValue:"25rem"},contentHeight:{type:"sap.ui.core.CSSSize",defaultValue:"28rem",since:"1.22"},componentName:{type:"string",since:"1.20.2"},hasGrouping:{type:"boolean",defaultValue:false,since:"1.22"},showSelectAll:{type:"boolean",defaultValue:true,since:"1.22"},showResetAll:{type:"boolean",defaultValue:true,since:"1.22"}},aggregations:{_tablePersoDialog:{type:"sap.m.TablePersoDialog",multiple:false,visibility:"hidden"},persoService:{type:"Object",multiple:false}},associations:{table:{type:"sap.m.Table",multiple:false},tables:{type:"sap.m.Table",multiple:true}},events:{personalizationsDone:{}},library:"sap.m"}});i.apply(s,{onDuplicate:function(e,t,i){if(t._sapui_candidateForDestroy){a.debug("destroying dangling template "+t+" when creating new object with same ID");t.destroy()}else{var o="adding TablePersoController with duplicate id '"+e+"'";if(sap.ui.getCore().getConfiguration().getNoDuplicateIds()){a.error(o);throw new Error("Error: "+o)}else{a.warning(o)}}}});s.prototype.init=function(){this._schemaProperty="_persoSchemaVersion";this._schemaVersion="1.0";this._oPersonalizations=null;this._mDelegateMap={};this._mTablePersMap={};this._mInitialTableStateMap={};this._triggersPersDoneEvent=true};s.prototype.exit=function(){this._callFunctionForAllTables(r.proxy(function(e){e.removeDelegate(this._mDelegateMap[e]);e._hasTablePersoController=function(){return false}},this));delete this._mDelegateMap;delete this._mTablePersMap;delete this._mInitialTableStateMap};s.prototype.activate=function(){this._callFunctionForAllTables(this._rememberInitialTableStates);this._callFunctionForAllTables(this._createAndAddDelegateForTable);return this};s.prototype.getTablePersoDialog=function(){return this.getAggregation("_tablePersoDialog")};s.prototype.applyPersonalizations=function(e){var t=this.getPersoService().getPersData();var i=this;t.done(function(t){if(t){i._adjustTable(t,e)}});t.fail(function(){a.error("Problem reading persisted personalization data.")})};s.prototype._createAndAddDelegateForTable=function(e){if(!this._mDelegateMap[e]){var t={onBeforeRendering:function(){this.applyPersonalizations(e);if(!this.getAggregation("_tablePersoDialog")){this._createTablePersoDialog(e)}}.bind(this)};e.addDelegate(t);t.onBeforeRendering();this._mDelegateMap[e]=t;var i=this;e._hasTablePersoController=function(){return!!i._mDelegateMap[this]}}};s.prototype._createTablePersoDialog=function(t){var i=new e(t.getId()+"-PersoDialog",{persoDialogFor:t,persoMap:this._getPersoColumnMap(t),columnInfoCallback:this._tableColumnInfo.bind(this),initialColumnState:this._mInitialTableStateMap[t],contentWidth:this.getContentWidth(),contentHeight:this.getContentHeight(),hasGrouping:this.getHasGrouping(),showSelectAll:this.getShowSelectAll(),showResetAll:this.getShowResetAll()});this.setAggregation("_tablePersoDialog",i);i.attachConfirm(r.proxy(function(){this._oPersonalizations=i.retrievePersonalizations();this._callFunctionForAllTables(this._personalizeTable);this.savePersonalizations();this.firePersonalizationsDone()},this))};s.prototype._adjustTable=function(e,t){if(e&&e.hasOwnProperty(this._schemaProperty)&&e[this._schemaProperty]===this._schemaVersion){this._oPersonalizations=e;if(t){this._personalizeTable(t)}else{this._callFunctionForAllTables(this._personalizeTable)}}};s.prototype._personalizeTable=function(e){var t=this._getPersoColumnMap(e);if(!!t&&!!this._oPersonalizations){var i=false;for(var o=0,r=this._oPersonalizations.aColumns.length;o<r;o++){var s=this._oPersonalizations.aColumns[o];var n=t[s.id];if(!n){n=sap.ui.getCore().byId(s.id);if(n){a.info("Migrating personalization persistence id of column "+s.id);s.id=t[n];i=true}}if(n){n.setVisible(s.visible);n.setOrder(s.order)}else{a.warning("Personalization could not be applied to column "+s.id+" - not found!")}}if(i){this.savePersonalizations()}e.invalidate()}};s.prototype.savePersonalizations=function(){var e=this._oPersonalizations;e[this._schemaProperty]=this._schemaVersion;var t=this.getPersoService().setPersData(e);t.done(function(){});t.fail(function(){a.error("Problem persisting personalization data.")})};s.prototype.refresh=function(){var e=function(e){this._mTablePersMap={};e.invalidate()};this._callFunctionForAllTables(e);var t=this.getAggregation("_tablePersoDialog");if(t){t.setPersoMap(this._getPersoColumnMap(sap.ui.getCore().byId(t.getPersoDialogFor())))}};s.prototype.openDialog=function(){var e=this.getAggregation("_tablePersoDialog");if(e){o("sapUiSizeCompact",e.getPersoDialogFor(),e._oDialog);e.open()}else{a.warning("sap.m.TablePersoController: trying to open TablePersoDialog before TablePersoService has been activated.")}};s.prototype.setContentWidth=function(e){this.setProperty("contentWidth",e,true);var t=this.getAggregation("_tablePersoDialog");if(t){t.setContentWidth(e)}return this};s.prototype.setContentHeight=function(e){this.setProperty("contentHeight",e,true);var t=this.getAggregation("_tablePersoDialog");if(t){t.setContentHeight(e)}return this};s.prototype.setHasGrouping=function(e){this.setProperty("hasGrouping",e,true);var t=this.getAggregation("_tablePersoDialog");if(t){t.setHasGrouping(e)}return this};s.prototype.setShowSelectAll=function(e){this.setProperty("showSelectAll",e,true);var t=this.getAggregation("_tablePersoDialog");if(t){t.setShowSelectAll(e)}return this};s.prototype.setShowResetAll=function(e){this.setProperty("showResetAll",e,true);var t=this.getAggregation("_tablePersoDialog");if(t){t.setShowResetAll(e)}return this};s.prototype.setComponentName=function(e){this.setProperty("componentName",e,true);return this};s.prototype._getMyComponentName=function(e){if(this.getComponentName()){return this.getComponentName()}if(e===null){return"empty_component"}var t=e.getMetadata();if(e.getMetadata().getStereotype()==="component"){return t._sComponentName}return this._getMyComponentName(e.getParent())};s.prototype._callFunctionForAllTables=function(e){var t=sap.ui.getCore().byId(this.getAssociation("table"));if(t){e.call(this,t)}var i=this.getAssociation("tables");if(i){for(var o=0,a=this.getAssociation("tables").length;o<a;o++){t=sap.ui.getCore().byId(this.getAssociation("tables")[o]);e.call(this,t)}}};s.prototype._isStatic=function(e){var t=sap.ui.getCore().getConfiguration().getUIDPrefix();var i=new RegExp("^"+t);return!i.test(e)};s.prototype._getPersoColumnMap=function(e){var t=this._mTablePersMap[e];if(!t){t={};var i=function(e){var t=e.lastIndexOf("-");return e.substring(t+1)};var o=i.call(this,e.getId());if(!this._isStatic(o)){a.error("Table "+e.getId()+" must have a static id suffix. Otherwise personalization can not be persisted.");t=null;return null}var r;var s=this._getMyComponentName(e);var n=this;e.getColumns().forEach(function(e){if(t){var l=e.getId();var p=i.call(n,l);if(!n._isStatic(p)){a.error("Suffix "+p+" of table column "+l+" must be static. Otherwise personalization can not be persisted for its table.");t=null;return null}r=s+"-"+o+"-"+p;t[e]=r;t[r]=e}});this._mTablePersMap[e]=t}return t};s.prototype._rememberInitialTableStates=function(e){this._mInitialTableStateMap[e]=this._tableColumnInfo(e,this._getPersoColumnMap(e))};s.prototype._tableColumnInfo=function(e,t){if(t){var i=e.getColumns(),o=[],r=this.getPersoService();i.forEach(function(e){var i=null;if(r.getCaption){i=r.getCaption(e)}var s=null;if(r.getGroup){s=r.getGroup(e)}if(!i){var n=e.getHeader();if(n.getText&&n.getText()){i=n.getText()}else if(n.getTitle&&n.getTitle()){i=n.getTitle()}if(!i){i=e.getId();a.warning("Please 'getCaption' callback implentation in your TablePersoProvider for column "+e+". Table personalization uses column id as fallback value.")}}o.push({text:i,order:e.getOrder(),visible:e.getVisible(),id:t[e],group:s})});o.sort(function(e,t){return e.order-t.order});return o}return null};return s});