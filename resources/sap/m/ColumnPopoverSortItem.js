/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","./ColumnPopoverItem","sap/m/ToggleButton","sap/m/Button","sap/m/StandardListItem","sap/m/List"],function(e,t,o,s,n,i){"use strict";var r=t.extend("sap.m.ColumnPopoverSortItem",{metadata:{library:"sap.m",properties:{label:{type:"string",group:"Misc",defaultValue:null}},events:{sort:{parameters:{property:{type:"string"}}}},aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:true}}}});r.prototype._createButton=function(t,r){var a=e.getLibraryResourceBundle("sap.m"),l=a.getText("COLUMNHEADERPOPOVER_SORT_BUTTON"),p=this.getItems(),u=this;if(p.length>1){var m=r.getAggregation("_popover");var g=new i;for(var c=0;c<p.length;c++){var f=new n({title:p[c].getText(),type:"Active"});g.addItem(f);f.data("key",p[c].getKey())}g.attachEvent("itemPress",function(e){m.close();var t=e.getParameter("listItem");u.fireSort({property:t.data("key")})});g.setVisible(false);m.addContent(g);return new o(t,{icon:"sap-icon://sort",type:"Transparent",tooltip:l,visible:this.getVisible(),press:function(){if(r._oShownCustomContent){r._oShownCustomContent.setVisible(false)}if(this.getPressed()){r._cleanSelection(this);if(g){g.setVisible(true);r._oShownCustomContent=g}}else if(g){g.setVisible(false);r._oShownCustomContent=null}}})}else{return new s(t,{icon:"sap-icon://sort",type:"Transparent",tooltip:l,visible:this.getVisible(),press:function(){var e=r.getAggregation("_popover");if(r._oShownCustomContent){r._oShownCustomContent.setVisible(false);r._oShownCustomContent=null;r._cleanSelection(this)}e.close();u.fireSort({property:p[0]?p[0].getKey():null})}})}};return r});
//# sourceMappingURL=ColumnPopoverSortItem.js.map