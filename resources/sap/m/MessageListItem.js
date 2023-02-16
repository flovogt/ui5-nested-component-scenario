/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/InvisibleText","./library","./StandardListItem","./Link","./MessageListItemRenderer"],function(e,t,i,r,s,a){"use strict";var n=e.MessageType;var p=i.ListType;var o=r.extend("sap.m.MessageListItem",{metadata:{library:"sap.m",properties:{activeTitle:{type:"boolean",group:"Misc",defaultValue:false},messageType:{type:"sap.ui.core.MessageType",group:"Appearance",defaultValue:n.Error}},aggregations:{link:{type:"sap.m.Link",group:"Misc",multiple:false},linkAriaDescribedBy:{type:"sap.ui.core.Control",group:"Misc",multiple:false}},events:{activeTitlePress:{}}},renderer:a});o.prototype.onBeforeRendering=function(){r.prototype.onBeforeRendering.apply(this,arguments);var e=this.getLink(),t;if(!e&&this.getActiveTitle()){e=new s({press:[this.fireActiveTitlePress,this]});this.setLink(e)}if(e&&!e.getAriaDescribedBy().length){t=this._getLinkAriaDescribedBy();e.setProperty("text",this.getTitle(),true);e.addAssociation("ariaDescribedBy",t.getId(),true);this.setAggregation("linkAriaDescribedBy",t,true)}};o.prototype._getLinkAriaDescribedBy=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("MESSAGE_VIEW_LINK_FOCUS_TEXT_"+this.getMessageType().toUpperCase());return new t(this.getId()+"-link",{text:e})};o.prototype.onkeydown=function(e){if(this.getActiveTitle()&&e.altKey&&e.key==="Enter"){this.fireActiveTitlePress(this)}};o.prototype.getContentAnnouncement=function(e){var t=r.prototype.getContentAnnouncement.apply(this,arguments),i,s,a;if(this.getActiveTitle()){a=this.getMessageType().toUpperCase();i=e.getText("MESSAGE_LIST_ITEM_FOCUS_TEXT_LOCATION_"+a);s=this.getType()===p.Navigation?e.getText("MESSAGE_LIST_ITEM_FOCUS_TEXT_DESCRIPTION"):"";t+=". ".concat(i,". ",s)}return t};return o});
//# sourceMappingURL=MessageListItem.js.map