/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library"],function(e){"use strict";var a={apiVersion:2};var t=e.TabsOverflowMode;a.render=function(e,a){if(!a.getVisible()){return}var s=a.getId(),i=a.getItems(),r=a.getVisibleTabFilters().length,n=0,l=a._checkTextOnly(),o=a._checkNoText(i),c=a._checkInLine(i)||a.isInlineMode();var d=a.getParent(),p=d&&d.isA("sap.m.IconTabBar")&&d.getUpperCase(),g=a.getAriaTexts()||{};e.openStart("div",a).class("sapMITH").class("sapContrastPlus").class("sapMITHBackgroundDesign"+a.getBackgroundDesign());if(p){e.class("sapMITBTextUpperCase")}if(l){e.class("sapMITBTextOnly")}if(o){e.class("sapMITBNoText")}if(c){e.class("sapMITBInLine");e.class("sapMITBTextOnly")}e.accessibilityState(a,{role:"navigation"});if(g.headerLabel){e.accessibilityState(a,{label:g.headerLabel})}e.openEnd();if(i.length&&a.getTabsOverflowMode()===t.StartAndEnd){e.openStart("div").class("sapMITHStartOverflow").openEnd();a._getStartOverflow().render(e);e.close("div")}if(g.headerDescription){e.renderControl(a._getInvisibleHeadText())}e.openStart("div",s+"-head").class("sapMITBHead");e.accessibilityState({role:"tablist",orientation:"horizontal"});if(g.headerDescription){e.accessibilityState({describedby:a._getInvisibleHeadText().getId()})}e.openEnd();for(var T=0;T<i.length;T++){var v=i[T];v.render(e,n,r);if(v.isA("sap.m.IconTabFilter")){if(v.getVisible()){n++}}}e.close("div");if(i.length){e.openStart("div").class("sapMITHEndOverflow").openEnd();a._getOverflow().render(e);e.close("div")}e.close("div")};return a},true);
//# sourceMappingURL=IconTabHeaderRenderer.js.map