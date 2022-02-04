/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/semantic/SemanticConfiguration","sap/ui/base/ManagedObject","sap/ui/core/Element","sap/ui/thirdparty/jquery"],function(t,e,o,r){"use strict";var n=o.extend("sap.m.semantic.SemanticControl",{metadata:{library:"sap.m",abstract:true,properties:{visible:{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{_control:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}}});n.prototype.setProperty=function(t,o,r){e.prototype.setProperty.call(this,t,o,true);this._applyProperty(t,o,r);return this};n.prototype.updateAggregation=function(t){this._getControl().updateAggregation(t)};n.prototype.refreshAggregation=function(t){this._getControl().refreshAggregation(t)};n.prototype.setAggregation=function(t,o,r){if(t==="_control"){return e.prototype.setAggregation.call(this,t,o,r)}return this._getControl().setAggregation(t,o,r)};n.prototype.getAggregation=function(t,o){if(t==="_control"){return e.prototype.getAggregation.call(this,t,o)}return this._getControl().getAggregation(t,o)};n.prototype.indexOfAggregation=function(t,e){return this._getControl().indexOfAggregation(t,e)};n.prototype.insertAggregation=function(t,e,o,r){return this._getControl().insertAggregation(t,e,o,r)};n.prototype.addAggregation=function(t,e,o){return this._getControl().addAggregation(t,e,o)};n.prototype.removeAggregation=function(t,e,o){return this._getControl().removeAggregation(t,e,o)};n.prototype.removeAllAggregation=function(t,e){return this._getControl().removeAllAggregation(t,e)};n.prototype.destroyAggregation=function(t,e){return this._getControl().destroyAggregation(t,e)};n.prototype.bindAggregation=function(t,e){return this._getControl().bindAggregation(t,e)};n.prototype.unbindAggregation=function(t,e){return this._getControl().unbindAggregation(t,e)};n.prototype.clone=function(t,e){var r=o.prototype.clone.apply(this,arguments);var n=this._getControl().clone(t,e);r.setAggregation("_control",n);return r};n.prototype.destroy=function(){var t=o.prototype.destroy.apply(this,arguments);if(this.getAggregation("_control")){this.getAggregation("_control").destroy()}return t};n.prototype.getPopupAnchorDomRef=function(){return this._getControl().getDomRef()};n.prototype.getDomRef=function(t){return this._getControl().getDomRef(t)};n.prototype.addEventDelegate=function(t,e){r.each(t,function(o,r){if(typeof r==="function"){var n=function(t){t.srcControl=this;r.call(e,t)}.bind(this);t[o]=n}}.bind(this));this._getControl().addEventDelegate(t,e);return this};n.prototype.removeEventDelegate=function(t){this._getControl().removeEventDelegate(t);return this};n.prototype._getConfiguration=function(){return t.getConfiguration(this.getMetadata().getName())};n.prototype._onPageStateChanged=function(t){this._updateState(t.sId)};n.prototype._updateState=function(t){if(this._getConfiguration()&&this._getControl()){var e=this._getConfiguration().states[t];if(e){this._getControl().applySettings(e)}}};n.prototype._applyProperty=function(t,e,o){var r="set"+this._capitalize(t);this._getControl()[r](e,o)};n.prototype._capitalize=function(t){return t.charAt(0).toUpperCase()+t.slice(1)};return n});