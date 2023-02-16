/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/library"],function(t,e,a,r){"use strict";var s=r.CalendarIntervalType;var i=t.extend("sap.m.delegate.DateNavigation",{constructor:function(){t.apply(this,arguments);this._unit=s.Day;this._start=new Date;this._step=1;this._calendarWeekNumbering=undefined}});i.HOURS24=1e3*3600*24;i.prototype.setUnit=function(t){this._unit=t};i.prototype.setStart=function(t){this._start=t};i.prototype.setStep=function(t){this._step=t};i.prototype.setCurrent=function(t){this._current=t};i.prototype.setWeekConfiguration=function(t){this._weekConfiguration=t};i.prototype.getUnit=function(){return this._unit};i.prototype.getStart=function(){return this._start};i.prototype.getStep=function(){return this._step};i.prototype.getCurrent=function(){return this._current};i.prototype.getWeekConfiguration=function(){return this._weekConfiguration};i.prototype.getEnd=function(t){var a=e._createUniversalUTCDate(this.getStart(),t,true);switch(this.getUnit()){case s.Day:case s.Week:a.setUTCDate(a.getUTCDate()+this.getStep()-1);break;case s.OneMonth:case"OneMonth":a.setUTCMonth(a.getUTCMonth()+1,1);a.setUTCDate(a.getUTCDate()-1,1);break;case s.Hour:a.setUTCHours(a.getUTCHours()+this.getStep()-1);break;case s.Month:a.setUTCMonth(a.getUTCMonth()+this.getStep()-1,1);break;default:break}return e._createLocalDate(a,true)};i.prototype.next=function(t){var a=e._createUniversalUTCDate(this.getStart(),t,true);var r=this.getCurrent()?e._createUniversalUTCDate(this.getCurrent(),t,true):e._createUniversalUTCDate(this.getStart(),t,true);switch(this.getUnit()){case s.Hour:r.setUTCHours(r.getUTCHours()+this.getStep());this.setCurrent(e._createLocalDate(r,true));a.setUTCHours(a.getUTCHours()+this.getStep());this.setStart(e._createLocalDate(a,true));break;case s.Week:case s.Day:r.setUTCDate(r.getUTCDate()+this.getStep());this.setCurrent(e._createLocalDate(r,true));a.setUTCDate(a.getUTCDate()+this.getStep());this.setStart(e._createLocalDate(a,true));break;case s.Month:r.setUTCMonth(r.getUTCMonth()+this.getStep(),1);this.setCurrent(e._createLocalDate(r,true));a.setUTCMonth(a.getUTCMonth()+this.getStep(),1);this.setStart(e._createLocalDate(a,true));break;case s.OneMonth:case"OneMonth":r.setUTCMonth(r.getUTCMonth()+1,1);this.setCurrent(e._createLocalDate(r,true));a.setUTCMonth(a.getUTCMonth()+1,1);this.setStart(e._createLocalDate(a,true));break;default:break}};i.prototype.previous=function(t){var a=e._createUniversalUTCDate(this.getStart(),t,true);var r=this.getCurrent()?e._createUniversalUTCDate(this.getCurrent(),t,true):e._createUniversalUTCDate(this.getStart(),t,true);switch(this.getUnit()){case s.Hour:r.setUTCHours(r.getUTCHours()-this.getStep());this.setCurrent(e._createLocalDate(r,true));a.setUTCHours(a.getUTCHours()-this.getStep());this.setStart(e._createLocalDate(a,true));break;case s.Week:case s.Day:r.setUTCDate(r.getUTCDate()-this.getStep());this.setCurrent(e._createLocalDate(r,true));a.setUTCDate(a.getUTCDate()-this.getStep());this.setStart(e._createLocalDate(a,true));break;case s.Month:r.setUTCMonth(r.getUTCMonth()-this.getStep(),1);this.setCurrent(e._createLocalDate(r,true));a.setUTCMonth(a.getUTCMonth()-this.getStep(),1);this.setStart(e._createLocalDate(a,true));break;case s.OneMonth:case"OneMonth":r.setUTCMonth(r.getUTCMonth()-1,1);this.setCurrent(e._createLocalDate(r,true));a.setUTCMonth(a.getUTCMonth()-1,1);this.setStart(e._createLocalDate(a,true));break;default:break}};i.prototype.toDate=function(t,r){var n,o,u,h=e._createUniversalUTCDate(t,r,true),c=e._createUTCDate(t,true);this.setCurrent(t);switch(this.getUnit()){case s.OneMonth:case"OneMonth":if(e.monthsDiffer(this.getStart(),t)){var U=e._getFirstDateOfMonth(a.fromLocalJSDate(t));this.setStart(U.toLocalJSDate())}break;case s.Day:o=e._createUniversalUTCDate(this.getStart(),r,true);o.setUTCDate(o.getUTCDate()+this.getStep());if(t.valueOf()>=o.valueOf()){u=1+Math.ceil((t.valueOf()-o.valueOf())/i.HOURS24);n=e._createUniversalUTCDate(this.getStart(),r,true);n.setUTCDate(n.getUTCDate()+u);this.setStart(e._createLocalDate(n,true))}else if(t.valueOf()<this.getStart().valueOf()){n=e._createUniversalUTCDate(t,r,true);this.setStart(e._createLocalDate(n,true))}break;case s.Month:o=e._createUniversalUTCDate(this.getStart(),r,true);o.setUTCMonth(o.getUTCMonth()+this.getStep(),1);if(h.getTime()>=o.valueOf()){u=1+e._monthsBetween(t,e._createLocalDate(o,true));n=e._createUniversalUTCDate(this.getStart(),r,true);n.setUTCMonth(n.getUTCMonth()+u,1);this.setStart(e._createLocalDate(n,true))}else if(t.valueOf()<this.getStart().valueOf()){n=e._createUniversalUTCDate(t,r,true);this.setStart(e._createLocalDate(n,true))}break;case s.Week:var C=e.getFirstDateOfWeek(c,this.getWeekConfiguration());if(this.getStart().valueOf()!==C.valueOf()){this.setStart(e._createLocalDate(C,true))}break;case s.Hour:o=this.getEnd();var g=e._createUniversalUTCDate(o,r,true);if(h.getTime()<e._createUniversalUTCDate(this.getStart(),r,true).getTime()||h.getTime()>g.getTime()){this.setStart(t)}break;default:break}};return i});
//# sourceMappingURL=DateNavigation.js.map