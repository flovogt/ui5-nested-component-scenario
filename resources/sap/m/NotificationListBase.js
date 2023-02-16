/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Element","sap/ui/Device","sap/ui/dom/isHidden","sap/ui/core/ResizeHandler","./ListItemBase","./Button","./ToolbarSeparator","sap/m/OverflowToolbar","sap/m/OverflowToolbarLayoutData","sap/ui/events/KeyCodes","sap/ui/core/IconPool","sap/ui/core/Icon","sap/ui/core/library"],function(t,e,o,r,s,i,n,a,l,u,p,f,h,c,g){"use strict";var y="NLIRangeSet";r.media.initRangeSet(y,[600],"px",["S","M"],true);var _=g.Priority;var v=t.ButtonType;var d=t.ToolbarStyle;var B=t.OverflowToolbarPriority;var w=e.getLibraryResourceBundle("sap.m"),m=w.getText("NOTIFICATION_LIST_ITEM_CLOSE"),b=w.getText("NOTIFICATION_LIST_GROUP_CLOSE");var C=n.extend("sap.m.NotificationListBase",{metadata:{library:"sap.m",abstract:true,properties:{priority:{type:"sap.ui.core.Priority",group:"Appearance",defaultValue:_.None},title:{type:"string",group:"Appearance",defaultValue:""},datetime:{type:"string",group:"Appearance",defaultValue:""},showButtons:{type:"boolean",group:"Behavior",defaultValue:true},showCloseButton:{type:"boolean",group:"Behavior",defaultValue:true},authorName:{type:"string",group:"Appearance",defaultValue:""},authorPicture:{type:"sap.ui.core.URI"}},aggregations:{buttons:{type:"sap.m.Button",multiple:true},_closeButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_overflowToolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_priorityIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{close:{}}},renderer:null});C.prototype._activeHandling=function(){};C.prototype.updateSelectedDOM=function(){};C.prototype.getAccessibilityText=function(){return""};C.prototype.setProperty=function(){this._resetButtonsOverflow();return n.prototype.setProperty.apply(this,arguments)};C.prototype.getButtons=function(){var t=this._getCloseButton(),e=this._getToolbarSeparator();return this._getOverflowToolbar().getContent().filter(function(o){return o!==t&&o!==e},this)};C.prototype.addButton=function(t){var e=this._getOverflowToolbar(),o=e.getContent().length;if(this._getToolbarSeparator()){o-=2}e.insertContent(t,o);this._resetButtonsOverflow();this.invalidate();return this};C.prototype.insertButton=function(t,e){this._getOverflowToolbar().insertContent(t,e);this._resetButtonsOverflow();this.invalidate();return this};C.prototype.removeButton=function(t){var e=this._getOverflowToolbar().removeContent(t.getId());this._resetButtonsOverflow();this.invalidate();return e};C.prototype.removeAllButtons=function(){var t=this._getOverflowToolbar(),e=this.getButtons();e.forEach(function(e){t.removeContent(e)});this._resetButtonsOverflow();this.invalidate();return this};C.prototype.destroyButtons=function(){var t=this.getButtons();t.forEach(function(t){t.destroy()});this._resetButtonsOverflow();this.invalidate();return this};C.prototype.clone=function(){var t=n.prototype.clone.apply(this,arguments);t.destroyAggregation("_overflowToolbar");var e=this.getAggregation("_overflowToolbar");if(e){t.setAggregation("_overflowToolbar",e.clone(),true)}return t};C.prototype._getOverflowToolbar=function(){var t=this.getAggregation("_overflowToolbar");if(!t){t=new u(this.getId()+"-overflowToolbar",{style:d.Clear});this.setAggregation("_overflowToolbar",t,true)}return t};C.prototype._getCloseButton=function(){var t,e,o,r;e=this._getOverflowToolbar();o=e.getContent();if(o.length){r=o.length-1;t=o[r];if(t.getId()!==this.getId()+"-closeButtonX"){t=null}}if(!t){t=this.getAggregation("_closeButton")}return t};C.prototype._createCloseButton=function(){var t,e=this.isA("sap.m.NotificationListGroup"),o=e&&this.getCollapsed();if(this._isSmallSize()&&!o){t=new a(this.getId()+"-closeButtonX",{text:this.isA("sap.m.NotificationListItem")?m:b,type:v.Default,press:function(){this.close()}.bind(this)})}else{t=new a(this.getId()+"-closeButtonX",{icon:h.getIconURI("decline"),type:v.Transparent,tooltip:this.isA("sap.m.NotificationListItem")?m:b,press:function(){this.close()}.bind(this)})}this.setAggregation("_closeButton",t);return t};C.prototype._getToolbarSeparator=function(){var t,e=this._getOverflowToolbar(),o=e.getContent(),r;if(o.length){r=o.length-2;t=o[r]}if(t&&t.isA("sap.m.ToolbarSeparator")){return t}return null};C.prototype._hasToolbarOverflowButton=function(){var t=this._isSmallSize()?0:1;return this.getShowButtons()&&this.getButtons().length>t};C.prototype._hasActionButtons=function(){return this.getShowButtons()&&this.getButtons().length};C.prototype._shouldRenderCloseButton=function(){return!this._isSmallSize()&&this.getShowCloseButton()};C.prototype._shouldRenderOverflowToolbar=function(){var t=this._hasActionButtons();if(this._isSmallSize()){return t||this.getShowCloseButton()}return t};C.prototype.onBeforeRendering=function(){if(this._resizeListenerId){i.deregister(this._resizeListenerId);this._resizeListenerId=null}if(!this._sCurrentLayoutClassName){this._destroyCloseBtnAndSeparator()}};C.prototype.onAfterRendering=function(){if(this.getDomRef()){this._resizeListenerId=i.register(this.getDomRef(),this._onResize.bind(this))}this._onResize()};C.prototype.exit=function(){if(this._resizeListenerId){i.deregister(this._resizeListenerId);this._resizeListenerId=null}this._sCurrentLayoutClassName=null};C.prototype.onkeydown=function(t){var e=t.target;switch(t.which){case 189:case f.NUMPAD_MINUS:case f.ARROW_LEFT:if(e.classList.contains("sapMNLGroup")){this._collapse(t);return}break;case f.PLUS:case f.NUMPAD_PLUS:case f.ARROW_RIGHT:if(e.classList.contains("sapMNLGroup")){this._expand(t);return}break;case f.F10:if(e.classList.contains("sapMNLIB")&&t.shiftKey&&this._hasToolbarOverflowButton()){this._getOverflowToolbar()._getOverflowButton().firePress();t.stopImmediatePropagation();t.preventDefault();return}break}this._focusSameItemOnNextRow(t)};C.prototype._focusSameItemOnNextRow=function(t){var e=this._getParentList(),r,i,n,a,l,u,p;if(!e){return}if(t.which!==f.ARROW_UP&&t.which!==f.ARROW_DOWN){return}t.stopPropagation();t.preventDefault();r=e.getItemNavigation();if(!r){return}i=r.getFocusedIndex();n=r.getItemDomRefs();switch(t.which){case f.ARROW_UP:do{i--}while(n[i]&&s(n[i]));break;case f.ARROW_DOWN:do{i++}while(n[i]&&s(n[i]));break}l=n[i];if(!l){return}l.focus();if(this.getDomRef()===t.target){return}a=o.closestTo(t.target);if(a.getId()===this.getId()+"-collapseButton"){p=l.querySelector(":scope > .sapMNLGroupHeader .sapMNLGroupCollapseButton .sapMBtn");if(p){p.focus()}return}if(a.isA("sap.m.Link")){p=l.querySelector(":scope > .sapMNLIMain .sapMNLIShowMore a");if(p){p.focus()}return}u=o.closestTo(l);if(!a.getParent().isA("sap.m.OverflowToolbar")){if(!u._focusCloseButton()){u._focusToolbarButton()}return}if(!u._focusToolbarButton()){u._focusCloseButton()}};C.prototype._focusCloseButton=function(){if(this.getShowCloseButton()&&this.getAggregation("_closeButton")){this.getAggregation("_closeButton").focus();return true}return false};C.prototype._focusToolbarButton=function(){var t,e,o;if(this._shouldRenderOverflowToolbar()){e=this._getOverflowToolbar();if(e._getOverflowButtonNeeded()){t=e._getOverflowButton()}else{o=e._getVisibleContent();t=this._isSmallSize()?o[o.length-1]:o[0]}t.focus();return true}return false};C.prototype._getParentList=function(){var t=this.getParent();if(t){if(t.isA("sap.m.NotificationList")){return t}t=t.getParent();if(t&&t.isA("sap.m.NotificationList")){return t}}return null};C.prototype._collapse=function(){};C.prototype._expand=function(){};C.prototype._onResize=function(){var t=this.getDomRef(),e,o;if(!t){return}e=r.media.getCurrentRange(y,t.offsetWidth);o="sapMNLIB-Layout"+e.name;if(this._sCurrentLayoutClassName===o){return}if(this._sCurrentLayoutClassName){this.removeStyleClass(this._sCurrentLayoutClassName)}this.addStyleClass(o);this._sCurrentLayoutClassName=o;this._arrangeButtons()};C.prototype._destroyCloseBtnAndSeparator=function(){var t=this._getCloseButton(),e=this._getToolbarSeparator();if(t){t.destroy()}if(e){e.destroy()}};C.prototype._arrangeButtons=function(){this._destroyCloseBtnAndSeparator();this._createCloseButton();if(this._isSmallSize()){this._arrangeSSizeButtons()}else{this._arrangeMSizeButtons()}};C.prototype._arrangeMSizeButtons=function(){var t,e=this.getButtons(),o=e.length>1?B.AlwaysOverflow:B.NeverOverflow;for(var r=0;r<e.length;r++){t=e[r];t.setLayoutData(new p({priority:o}))}};C.prototype._arrangeSSizeButtons=function(){var t=this._getOverflowToolbar(),e=this._getCloseButton(),o=this.isA("sap.m.NotificationListGroup"),r=o?b:m,s=o&&this.getCollapsed(),i=!s&&this._hasActionButtons(),n=this.getShowCloseButton(),a=new l,u;this.getButtons().forEach(function(t){if(i){u=B.AlwaysOverflow;t.removeStyleClass("sapMNLIBHiddenButton")}else{u=B.NeverOverflow;t.addStyleClass("sapMNLIBHiddenButton")}t.setLayoutData(new p({priority:u}))});e.setLayoutData(new p({priority:B.AlwaysOverflow}));a.setLayoutData(new p({priority:B.AlwaysOverflow}));t.addContent(a);t.addContent(e);if(!n){e.setVisible(false);a.setVisible(false);return}e.setVisible(true);if(i){e.setText(r);e.setTooltip("");e.setType(v.Default);e.setIcon("");e.setLayoutData(new p({priority:B.AlwaysOverflow}));a.setVisible(true)}else{e.setText("");e.setTooltip(r);e.setType(v.Transparent);e.setIcon(h.getIconURI("decline"));e.setLayoutData(new p({priority:B.NeverOverflow}));a.setVisible(false)}};C.prototype.close=function(){var t=this.getParent();this.fireClose();var e=!!this.getParent();if(!e&&t&&t instanceof o){var r={onAfterRendering:function(){t.focus();t.removeEventDelegate(r)}};t.addEventDelegate(r)}};C.prototype._getPriorityIcon=function(){var t=this.getAggregation("_priorityIcon");if(!t){t=new c({src:"sap-icon://message-error",useIconTooltip:false});this.setAggregation("_priorityIcon",t,true)}return t};C.prototype._isSmallSize=function(){return this._sCurrentLayoutClassName==="sapMNLIB-LayoutS"};C.prototype._resetButtonsOverflow=function(){this._sCurrentLayoutClassName=null};return C});
//# sourceMappingURL=NotificationListBase.js.map