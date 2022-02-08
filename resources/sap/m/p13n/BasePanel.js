/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/json/JSONModel","sap/m/VBox","sap/ui/core/Control","sap/m/Column","sap/m/Text","sap/ui/model/Filter","sap/m/Table","sap/m/OverflowToolbar","sap/m/SearchField","sap/m/ToolbarSpacer","sap/m/OverflowToolbarButton","sap/m/OverflowToolbarLayoutData","sap/base/util/merge","sap/ui/core/dnd/DragDropInfo"],function(t,e,o,i,n,s,r,a,l,p,h,_,u,g){"use strict";var d=o.extend("sap.m.p13n.BasePanel",{metadata:{library:"sap.m",interfaces:["sap.m.p13n.IContent"],associations:{},properties:{title:{type:"string"},enableReorder:{type:"boolean",defaultValue:true}},aggregations:{messageStrip:{type:"sap.m.MessageStrip",multiple:false},_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_template:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{change:{reason:{type:"string"},item:{type:"object"}}}},renderer:{apiVersion:2,render:function(t,e){t.openStart("div",e);t.style("height","100%");t.openEnd();t.renderControl(e.getAggregation("_content"));t.close("div")}}});d.prototype.P13N_MODEL="$p13n";d.prototype.CHANGE_REASON_ADD="Add";d.prototype.CHANGE_REASON_REMOVE="Remove";d.prototype.CHANGE_REASON_MOVE="Move";d.prototype.CHANGE_REASON_SELECTALL="SelectAll";d.prototype.CHANGE_REASON_DESELECTALL="DeselectAll";d.prototype.PRESENCE_ATTRIBUTE="visible";d.prototype.init=function(){o.prototype.init.apply(this,arguments);this._oP13nModel=new t({});this._oP13nModel.setSizeLimit(1e4);this.setModel(this._oP13nModel,this.P13N_MODEL);this._oListControl=this._createInnerListControl();this._bFocusOnRearrange=true;this._setInnerLayout();this._oListControl.setMultiSelectMode("ClearAll")};d.prototype._setInnerLayout=function(){this.setAggregation("_content",new e({items:[this._oListControl]}))};d.prototype.setP13nData=function(t){this._getP13nModel().setProperty("/items",u([],t));return this};d.prototype.getP13nData=function(t){var e=u([],this._getP13nModel().getProperty("/items"));if(t){e=e.filter(function(t){return t[this.PRESENCE_ATTRIBUTE]}.bind(this))}return e};d.prototype.setMessageStrip=function(t){if(!t){this.getAggregation("_content").removeItem(this._oMessageStrip);this._oMessageStrip=null}else{t.addStyleClass("sapUiSmallMargin");if(this._oMessageStrip){this._oMessageStrip.destroy()}this._oMessageStrip=t;this.getAggregation("_content").insertItem(t,0)}return this};d.prototype.getMessageStrip=function(){return this._oMessageStrip};d.prototype.setEnableReorder=function(t){var e=this.getAggregation("_template");if(t){this._addHover(e)}else if(e&&e.aDelegates&&e.aDelegates.length>0){e.removeEventDelegate(e.aDelegates[0].oDelegate)}this._getDragDropConfig().setEnabled(t);this._setMoveButtonVisibility(t);this.setProperty("enableReorder",t);return this};d.prototype._getDragDropConfig=function(){if(!this._oDragDropInfo){this._oDragDropInfo=new g({enabled:false,sourceAggregation:"items",targetAggregation:"items",dropPosition:"Between",drop:[this._onRearrange,this]})}return this._oDragDropInfo};d.prototype._getMoveTopButton=function(){if(!this._oMoveTopBtn){this._oMoveTopBtn=new h(this.getId()+"-moveTopBtn",{type:"Transparent",tooltip:this._getResourceText("p13n.MOVE_TO_TOP"),icon:"sap-icon://collapse-group",press:[this._onPressButtonMoveToTop,this],visible:false});this.addDependent(this._oMoveTopBtn)}return this._oMoveTopBtn};d.prototype._getMoveUpButton=function(){if(!this._oMoveUpButton){this._oMoveUpButton=new h(this.getId()+"-moveUpBtn",{type:"Transparent",tooltip:this._getResourceText("p13n.MOVE_UP"),icon:"sap-icon://navigation-up-arrow",press:[this._onPressButtonMoveUp,this],visible:false});this.addDependent(this._oMoveUpButton)}return this._oMoveUpButton};d.prototype._getMoveDownButton=function(){if(!this._oMoveDownButton){this._oMoveDownButton=new h(this.getId()+"-moveDownpBtn",{type:"Transparent",tooltip:this._getResourceText("p13n.MOVE_DOWN"),icon:"sap-icon://navigation-down-arrow",press:[this._onPressButtonMoveDown,this],visible:false});this.addDependent(this._oMoveDownButton)}return this._oMoveDownButton};d.prototype._getMoveBottomButton=function(){if(!this._oMoveBottomButton){this._oMoveBottomButton=new h(this.getId()+"-moveBottomBtn",{type:"Transparent",tooltip:this._getResourceText("p13n.MOVE_TO_BOTTOM"),icon:"sap-icon://expand-group",press:[this._onPressButtonMoveToBottom,this],visible:false});this.addDependent(this._oMoveBottomButton)}return this._oMoveBottomButton};d.prototype._createInnerListControl=function(){return new r(this.getId()+"-innerP13nList",Object.assign(this._getListControlConfig(),{headerToolbar:new a({content:[this._getSearchField(),new p,this._getMoveTopButton(),this._getMoveUpButton(),this._getMoveDownButton(),this._getMoveBottomButton()]})}))};d.prototype._addHover=function(t){if(t&&t.aDelegates.length<1){t.addEventDelegate({onmouseover:this._hoverHandler.bind(this),onfocusin:this._focusHandler.bind(this)})}};d.prototype._focusHandler=function(t){if(!this.getEnableReorder()){return}var e=sap.ui.getCore().byId(t.currentTarget.id);this._handleActivated(e)};d.prototype._hoverHandler=function(t){if(this._oSelectedItem&&!this._oSelectedItem.bIsDestroyed){return}if(!this.getEnableReorder()){return}var e=sap.ui.getCore().byId(t.currentTarget.id);this._handleActivated(e)};d.prototype._handleActivated=function(t){this._oHoveredItem=t};d.prototype._getListControlConfig=function(){return{mode:"MultiSelect",rememberSelections:true,itemPress:[this._onItemPressed,this],selectionChange:[this._onSelectionChange,this],sticky:["HeaderToolbar","ColumnHeaders","InfoToolbar"],dragDropConfig:this._getDragDropConfig()}};d.prototype._getSearchField=function(){if(!this._oSearchField){this._oSearchField=new l(this.getId()+"-searchField",{liveChange:[this._onSearchFieldLiveChange,this],width:"100%",layoutData:new _({shrinkable:true,moveToOverflow:true,priority:"High",maxWidth:"16rem"})})}return this._oSearchField};d.prototype._setTemplate=function(t){t.setType("Active");this.setAggregation("_template",t);if(t){if(this.getEnableReorder()){this._addHover(t)}this._oSelectionBindingInfo=t.getBindingInfo("selected");if(this._oSelectionBindingInfo&&this._oSelectionBindingInfo.parts){this._oSelectionBindingInfo={parts:this._oSelectionBindingInfo.parts}}}this._bindListItems();return this};d.prototype._setPanelColumns=function(t){var e;if(t instanceof Array){e=t}else{e=[t]}this._addTableColumns(e)};d.prototype._getP13nModel=function(){return this.getModel(this.P13N_MODEL)};d.prototype._getResourceText=function(t,e){this.oResourceBundle=this.oResourceBundle?this.oResourceBundle:sap.ui.getCore().getLibraryResourceBundle("sap.m");return t?this.oResourceBundle.getText(t,e):this.oResourceBundle};d.prototype._addTableColumns=function(t){var e=this._oListControl.removeAllColumns();e.forEach(function(t){t.destroy()});t.forEach(function(t){var e;if(typeof t=="string"){e=new i({header:new n({text:t})})}else{e=t}this._oListControl.addColumn(e)},this)};d.prototype._bindListItems=function(t){var e=this.getAggregation("_template");if(e){this._oListControl.bindItems(Object.assign({path:this.P13N_MODEL+">/items",key:"name",templateShareable:false,template:this.getAggregation("_template").clone()},t))}};d.prototype._onSelectionChange=function(t){var e=t.getParameter("listItems");var o=t.getParameter("selectAll");var i=!o&&e.length>1;e.forEach(function(t){this._selectTableItem(t,o||i)},this);if(o||i){this.fireChange({reason:o?this.CHANGE_REASON_SELECTALL:this.CHANGE_REASON_DESELECTALL,item:undefined})}if(i){this._getMoveTopButton().setEnabled(false);this._getMoveUpButton().setEnabled(false);this._getMoveDownButton().setEnabled(false);this._getMoveBottomButton().setEnabled(false)}};d.prototype._onItemPressed=function(t){var e=t.getParameter("listItem");this._oSelectedItem=e;var o=e.getBindingContext(this.P13N_MODEL);if(this.getEnableReorder()&&o&&o.getProperty(this.PRESENCE_ATTRIBUTE)){this._handleActivated(e);this._updateEnableOfMoveButtons(e,true)}};d.prototype._onSearchFieldLiveChange=function(t){this._oListControl.getBinding("items").filter(new s("label","Contains",t.getSource().getValue()))};d.prototype._onPressButtonMoveToTop=function(){this._moveSelectedItem(0)};d.prototype._onPressButtonMoveUp=function(){this._moveSelectedItem("Up")};d.prototype._onPressButtonMoveDown=function(){this._moveSelectedItem("Down")};d.prototype._onPressButtonMoveToBottom=function(){var t=this._oListControl.getItems().length-1;this._moveSelectedItem(t)};d.prototype._setMoveButtonVisibility=function(t){this._getMoveTopButton().setVisible(t);this._getMoveUpButton().setVisible(t);this._getMoveDownButton().setVisible(t);this._getMoveBottomButton().setVisible(t)};d.prototype._filterBySelected=function(t,e){e.getBinding("items").filter(t?new s(this.PRESENCE_ATTRIBUTE,"EQ",true):[])};d.prototype._selectTableItem=function(t,e){this._updateEnableOfMoveButtons(t,e?false:true);this._oSelectedItem=t;if(!e){var o=this._getP13nModel().getProperty(this._oSelectedItem.getBindingContext(this.P13N_MODEL).sPath);this.fireChange({reason:o[this.PRESENCE_ATTRIBUTE]?this.CHANGE_REASON_ADD:this.CHANGE_REASON_REMOVE,item:o})}};d.prototype._moveSelectedItem=function(t){var e=this._oSelectedItem;var o=this._oListControl.indexOfItem(e);if(o<0){return}var i=typeof t=="number"?t:o+(t=="Up"?-1:1);this._moveTableItem(e,i)};d.prototype._getModelEntry=function(t){return t.getBindingContext(this.P13N_MODEL).getObject()};d.prototype._moveTableItem=function(t,e){var o=this._oListControl.getItems();var i=this._getP13nModel().getProperty("/items");var n=i.indexOf(this._getModelEntry(t));e=e<=0?0:Math.min(e,o.length-1);e=i.indexOf(this._getModelEntry(o[e]));if(e==n){return}i.splice(e,0,i.splice(n,1)[0]);this._getP13nModel().setProperty("/items",i);this._oSelectedItem=this._oListControl.getItems()[e];this._updateEnableOfMoveButtons(this._oSelectedItem,this._bFocusOnRearrange);this._handleActivated(this._oSelectedItem);this.fireChange({reason:this.CHANGE_REASON_MOVE,item:this._getModelEntry(t)})};d.prototype._onRearrange=function(t){var e=t.getParameter("draggedControl");var o=t.getParameter("droppedControl");var i=t.getParameter("dropPosition");var n=this._oListControl.indexOfItem(e);var s=this._oListControl.indexOfItem(o);var r=s+(i=="Before"?0:1)+(n<s?-1:0);this._moveTableItem(e,r)};d.prototype._updateEnableOfMoveButtons=function(t,e){var o=this._oListControl.getItems().indexOf(t);var i=true,n=true;if(o==0){i=false}if(o==this._oListControl.getItems().length-1){n=false}this._getMoveTopButton().setEnabled(i);this._getMoveUpButton().setEnabled(i);this._getMoveDownButton().setEnabled(n);this._getMoveBottomButton().setEnabled(n);if(e){t.focus()}};d.prototype.exit=function(){o.prototype.exit.apply(this,arguments);this._bFocusOnRearrange=null;this._oHoveredItem=null;this._oSelectionBindingInfo=null;this._oSelectedItem=null;this._oListControl=null;this._oMoveTopBtn=null;this._oMoveUpButton=null;this._oMoveDownButton=null;this._oMoveBottomButton=null;this._oSearchField=null};return d});