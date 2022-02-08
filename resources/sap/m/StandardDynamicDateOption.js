/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/Element","./DynamicDateOption","./Label","./StepInput","./RadioButton","./RadioButtonGroup","sap/ui/unified/Calendar","sap/ui/unified/calendar/MonthPicker","sap/ui/core/format/DateFormat","sap/ui/core/date/UniversalDateUtils","sap/ui/core/date/UniversalDate","sap/m/DynamicDateValueHelpUIType","./library"],function(e,t,a,r,s,T,n,A,E,R,S,i,c,u){"use strict";var D=e.VerticalAlign;var o=a.extend("sap.m.StandardDynamicDateOption",{metadata:{library:"sap.m"}});var g=1;var l=6e3;var O={DATE:"DATE",DATERANGE:"DATERANGE",TODAY:"TODAY",YESTERDAY:"YESTERDAY",TOMORROW:"TOMORROW",SPECIFICMONTH:"SPECIFICMONTH",FIRSTDAYWEEK:"FIRSTDAYWEEK",LASTDAYWEEK:"LASTDAYWEEK",FIRSTDAYMONTH:"FIRSTDAYMONTH",LASTDAYMONTH:"LASTDAYMONTH",FIRSTDAYQUARTER:"FIRSTDAYQUARTER",LASTDAYQUARTER:"LASTDAYQUARTER",FIRSTDAYYEAR:"FIRSTDAYYEAR",LASTDAYYEAR:"LASTDAYYEAR",THISWEEK:"THISWEEK",THISMONTH:"THISMONTH",THISQUARTER:"THISQUARTER",THISYEAR:"THISYEAR",LASTWEEK:"LASTWEEK",LASTMONTH:"LASTMONTH",LASTQUARTER:"LASTQUARTER",LASTYEAR:"LASTYEAR",NEXTWEEK:"NEXTWEEK",NEXTMONTH:"NEXTMONTH",NEXTQUARTER:"NEXTQUARTER",NEXTYEAR:"NEXTYEAR",LASTDAYS:"LASTDAYS",LASTWEEKS:"LASTWEEKS",LASTMONTHS:"LASTMONTHS",LASTQUARTERS:"LASTQUARTERS",LASTYEARS:"LASTYEARS",NEXTDAYS:"NEXTDAYS",NEXTWEEKS:"NEXTWEEKS",NEXTMONTHS:"NEXTMONTHS",NEXTQUARTERS:"NEXTQUARTERS",NEXTYEARS:"NEXTYEARS",FROM:"FROM",TO:"TO",YEARTODATE:"YEARTODATE",DATETOYEAR:"DATETOYEAR",TODAYFROMTO:"TODAYFROMTO",QUARTER1:"QUARTER1",QUARTER2:"QUARTER2",QUARTER3:"QUARTER3",QUARTER4:"QUARTER4"};var Y={SingleDates:1,DateRanges:2,Weeks:3,Months:4,Quarters:5,Years:6};var p={DATE:Y.SingleDates,DATERANGE:Y.DateRanges,TODAY:Y.SingleDates,YESTERDAY:Y.SingleDates,TOMORROW:Y.SingleDates,SPECIFICMONTH:Y.Months,FIRSTDAYWEEK:Y.SingleDates,LASTDAYWEEK:Y.SingleDates,FIRSTDAYMONTH:Y.SingleDates,LASTDAYMONTH:Y.SingleDates,FIRSTDAYQUARTER:Y.SingleDates,LASTDAYQUARTER:Y.SingleDates,FIRSTDAYYEAR:Y.SingleDates,LASTDAYYEAR:Y.SingleDates,THISWEEK:Y.Weeks,THISMONTH:Y.Months,THISQUARTER:Y.Quarters,THISYEAR:Y.Years,LASTWEEK:Y.Weeks,LASTMONTH:Y.Months,LASTQUARTER:Y.Quarters,LASTYEAR:Y.Years,NEXTWEEK:Y.Weeks,NEXTMONTH:Y.Months,NEXTQUARTER:Y.Quarters,NEXTYEAR:Y.Years,LASTDAYS:Y.DateRanges,LASTWEEKS:Y.DateRanges,LASTMONTHS:Y.DateRanges,LASTQUARTERS:Y.DateRanges,LASTYEARS:Y.DateRanges,NEXTDAYS:Y.DateRanges,NEXTWEEKS:Y.DateRanges,NEXTMONTHS:Y.DateRanges,NEXTQUARTERS:Y.DateRanges,NEXTYEARS:Y.DateRanges,FROM:Y.DateRanges,TO:Y.DateRanges,YEARTODATE:Y.DateRanges,DATETOYEAR:Y.DateRanges,TODAYFROMTO:Y.DateRanges,QUARTER1:Y.Quarters,QUARTER2:Y.Quarters,QUARTER3:Y.Quarters,QUARTER4:Y.Quarters};var N=["LASTDAYS","LASTWEEKS","LASTMONTHS","LASTQUARTERS","LASTYEARS"];var y=["NEXTDAYS","NEXTWEEKS","NEXTMONTHS","NEXTQUARTERS","NEXTYEARS"];o.LastXKeys=N;o.NextXKeys=y;var L=sap.ui.getCore().getLibraryResourceBundle("sap.m");o.Keys=O;o.prototype.exit=function(){if(this.aValueHelpUITypes){while(this.aValueHelpUITypes.length){this.aValueHelpUITypes.pop().destroy()}delete this.aValueHelpUITypes}};o.prototype.getText=function(e){var t=this.getKey();var a=e._getOptions();var r=this.getValueHelpUITypes(e);var s=this._getOptionParams(N,a);var T=this._getOptionParams(y,a);if(s){r.push(s)}if(T){r.push(T)}switch(t){case O.LASTDAYS:case O.LASTWEEKS:case O.LASTMONTHS:case O.LASTQUARTERS:case O.LASTYEARS:case O.NEXTDAYS:case O.NEXTWEEKS:case O.NEXTMONTHS:case O.NEXTQUARTERS:case O.NEXTYEARS:return this._getXPeriodTitle(r[1].getOptions());default:return L.getText("DYNAMIC_DATE_"+t+"_TITLE")}};o.prototype.getValueHelpUITypes=function(e){var t=this.getKey();if(!this.aValueHelpUITypes){switch(t){case O.TODAY:case O.YESTERDAY:case O.TOMORROW:case O.FIRSTDAYWEEK:case O.LASTDAYWEEK:case O.FIRSTDAYMONTH:case O.LASTDAYMONTH:case O.FIRSTDAYQUARTER:case O.LASTDAYQUARTER:case O.FIRSTDAYYEAR:case O.LASTDAYYEAR:case O.THISWEEK:case O.THISMONTH:case O.THISQUARTER:case O.THISYEAR:case O.LASTWEEK:case O.LASTMONTH:case O.LASTQUARTER:case O.LASTYEAR:case O.NEXTWEEK:case O.NEXTMONTH:case O.NEXTQUARTER:case O.NEXTYEAR:case O.YEARTODATE:case O.DATETOYEAR:case O.QUARTER1:case O.QUARTER2:case O.QUARTER3:case O.QUARTER4:this.aValueHelpUITypes=[];break;case O.DATE:case O.FROM:case O.TO:this.aValueHelpUITypes=[new c({type:"date"})];break;case O.DATERANGE:this.aValueHelpUITypes=[new c({type:"daterange"})];break;case O.SPECIFICMONTH:this.aValueHelpUITypes=[new c({type:"month"})];break;case O.LASTDAYS:case O.LASTWEEKS:case O.LASTMONTHS:case O.LASTQUARTERS:case O.LASTYEARS:case O.NEXTDAYS:case O.NEXTWEEKS:case O.NEXTMONTHS:case O.NEXTQUARTERS:case O.NEXTYEARS:this.aValueHelpUITypes=[new c({text:L.getText("DDR_LASTNEXTX_LABEL"),type:"int"})];break;case O.TODAYFROMTO:this.aValueHelpUITypes=[new c({text:L.getText("DDR_TODAYFROMTO_FROM_LABEL"),type:"int",additionalText:L.getText("DDR_TODAYFROMTO_TO_ADDITIONAL_LABEL")}),new c({text:L.getText("DDR_TODAYFROMTO_TO_LABEL"),type:"int",additionalText:L.getText("DDR_TODAYFROMTO_TO_ADDITIONAL_LABEL")})];break}}return this.aValueHelpUITypes.slice(0)};o.prototype.createValueHelpUI=function(e,t){var a=e._getOptions();var s=e.getValue();var T=this.getValueHelpUITypes(e);var n=[];if(!e.aControlsByParameters){e.aControlsByParameters={}}e.aControlsByParameters[this.getKey()]=[];var A=this._getOptionParams(N,a);var E=this._getOptionParams(y,a);if(A){T.push(A)}if(E){T.push(E)}for(var R=0;R<T.length;R++){if(T[R].getOptions()&&T[R].getOptions().length<=1){break}else if(T[R].getText()){n.push(new r({text:T[R].getText(),width:"100%"}))}var S;switch(T[R].getType()){case"int":S=this._createIntegerControl(s,R,t);if(s&&T[1]&&T[1].getOptions()&&T[1].getOptions().indexOf(s.operator.slice(4).toLowerCase())!==-1){S.setValue(s.values[R])}break;case"date":S=this._createDateControl(s,R,t);break;case"daterange":S=this._createDateRangeControl(s,R,t);break;case"month":S=this._createMonthControl(s,R,t);break;case"options":S=this._createOptionsControl(s,R,t,T);break}n.push(S);if(T[R].getAdditionalText()){n.push(new r({vAlign:D.Bottom,text:T[R].getAdditionalText()}).addStyleClass("sapMDDRAdditionalLabel"))}e.aControlsByParameters[this.getKey()].push(S)}return n};o.prototype._createIntegerControl=function(e,t,r){var s=a.prototype._createIntegerControl.call(this,e,t,r);var T=this.getKey()==="TODAYFROMTO"?-l:g;var n=!e||this.getKey()!==e.operator;if(this.getKey()==="TODAYFROMTO"&&n){s.setValue(1)}s.setMin(T);s.setMax(l);return s};o.prototype._createOptionsControl=function(e,t,a,r){var s=new n({buttons:[r[t].getOptions().map(h)]});if(e){var T=r[t].getOptions().indexOf(e.operator.slice(4).toLowerCase());if(T!==-1){s.setSelectedIndex(T)}}if(a instanceof Function){s.attachSelect(function(){a(this)},this)}return s};o.prototype._getOptionParams=function(e,t){if(e.indexOf(this.getKey())!==-1){return new c({text:L.getText("DDR_LASTNEXTX_TIME_PERIODS_LABEL"),type:"options",options:t?t.filter(function(t){return e.indexOf(t.getKey())!==-1}).map(function(e){return e.getKey().slice(4).toLowerCase()}):[]})}return undefined};o.prototype.validateValueHelpUI=function(e){var t=this.getValueHelpUITypes();for(var a=0;a<t.length;a++){var r=e.aControlsByParameters[this.getKey()][a];switch(t[a].getType()){case"int":if(r._isLessThanMin(r.getValue())||r._isMoreThanMax(r.getValue())){return false}break;case"month":case"date":case"daterange":if(!r.getSelectedDates()||r.getSelectedDates().length==0){return false}break;case"options":if(r.getSelectedIndex()<0){return false}break}}return true};o.prototype.getValueHelpOutput=function(e){var t=e._getOptions();var a=this.getValueHelpUITypes(e),r={},s;if(N.indexOf(this.getKey())!==-1&&e.aControlsByParameters[this.getKey()].length>1){r.operator=t.filter(function(e){return N.indexOf(e.getKey())!==-1})[e.aControlsByParameters[this.getKey()][1].getSelectedIndex()].getKey()}else if(y.indexOf(this.getKey())!==-1&&e.aControlsByParameters[this.getKey()].length>1){r.operator=t.filter(function(e){return y.indexOf(e.getKey())!==-1})[e.aControlsByParameters[this.getKey()][1].getSelectedIndex()].getKey()}else{r.operator=this.getKey()}r.values=[];for(var T=0;T<a.length;T++){var n=e.aControlsByParameters[this.getKey()][T];switch(a[T].getType()){case"int":s=n.getValue();break;case"month":if(!n.getSelectedDates()||!n.getSelectedDates().length){return null}s=n.getSelectedDates()[0].getStartDate().getMonth();break;case"date":if(!n.getSelectedDates().length){return null}s=n.getSelectedDates()[0].getStartDate();break;case"daterange":if(!n.getSelectedDates().length){return null}var A=n.getSelectedDates()[0].getEndDate()||n.getSelectedDates()[0].getStartDate();s=[n.getSelectedDates()[0].getStartDate(),A];break}if(Array.isArray(s)){r.values=Array.prototype.concat.apply(r.values,s)}else{s!==null&&s!==undefined&&r.values.push(s)}}return r};o.prototype.getGroup=function(){return p[this.getKey()]};o.prototype.getGroupHeader=function(){return L.getText("DDR_OPTIONS_GROUP_"+p[this.getKey()])};o.prototype.format=function(e,t){return t.format(e)};o.prototype.parse=function(e,t){return t.parse(e,this.getKey())};o.prototype.toDates=function(e){if(!e){return null}var t=e.operator;var a=e.values[0]||0;switch(t){case"SPECIFICMONTH":var r=new i;r.setMonth(e.values[0]);r=S.getMonthStartDate(r);return S.getRange(0,"MONTH",r);case"DATE":return S.getRange(0,"DAY",i.getInstance(e.values[0]));case"DATERANGE":var s=i.getInstance(e.values[0]);var T=i.getInstance(e.values[1]);return[S.resetStartTime(s),S.resetEndTime(T)];case"TODAY":return S.ranges.today();case"YESTERDAY":return S.ranges.yesterday();case"TOMORROW":return S.ranges.tomorrow();case"FIRSTDAYWEEK":return S.ranges.firstDayOfWeek();case"LASTDAYWEEK":return S.ranges.lastDayOfWeek();case"FIRSTDAYMONTH":return S.ranges.firstDayOfMonth();case"LASTDAYMONTH":return S.ranges.lastDayOfMonth();case"FIRSTDAYQUARTER":return S.ranges.firstDayOfQuarter();case"LASTDAYQUARTER":return S.ranges.lastDayOfQuarter();case"FIRSTDAYYEAR":return S.ranges.firstDayOfYear();case"LASTDAYYEAR":return S.ranges.lastDayOfYear();case"THISWEEK":return S.ranges.currentWeek();case"THISMONTH":return S.ranges.currentMonth();case"THISQUARTER":return S.ranges.currentQuarter();case"THISYEAR":return S.ranges.currentYear();case"LASTWEEK":return S.ranges.lastWeek();case"LASTMONTH":return S.ranges.lastMonth();case"LASTQUARTER":return S.ranges.lastQuarter();case"LASTYEAR":return S.ranges.lastYear();case"NEXTWEEK":return S.ranges.nextWeek();case"NEXTMONTH":return S.ranges.nextMonth();case"NEXTQUARTER":return S.ranges.nextQuarter();case"NEXTYEAR":return S.ranges.nextYear();case"LASTDAYS":return S.ranges.lastDays(a);case"LASTWEEKS":return S.ranges.lastWeeks(a);case"LASTMONTHS":return S.ranges.lastMonths(a);case"LASTQUARTERS":return S.ranges.lastQuarters(a);case"LASTYEARS":return S.ranges.lastYears(a);case"NEXTDAYS":return S.ranges.nextDays(a);case"NEXTWEEKS":return S.ranges.nextWeeks(a);case"NEXTMONTHS":return S.ranges.nextMonths(a);case"NEXTQUARTERS":return S.ranges.nextQuarters(a);case"NEXTYEARS":return S.ranges.nextYears(a);case"FROM":return[e.values[0],e.values[0]];case"TO":return[e.values[0],e.values[0]];case"YEARTODATE":return S.ranges.yearToDate();case"DATETOYEAR":return S.ranges.dateToYear();case"TODAYFROMTO":if(e.values.length!==2){return[]}var n=e.values[0];var A=e.values[1];var s=n>=0?S.ranges.lastDays(n)[0]:S.ranges.nextDays(-n)[1];var T=A>=0?S.ranges.nextDays(A)[1]:S.ranges.lastDays(-A)[0];if(s.oDate.getTime()>T.oDate.getTime()){T=[s,s=T][0]}return[S.resetStartTime(s),S.resetEndTime(T)];case"QUARTER1":return S.ranges.quarter(1);case"QUARTER2":return S.ranges.quarter(2);case"QUARTER3":return S.ranges.quarter(3);case"QUARTER4":return S.ranges.quarter(4);default:return[]}};o.prototype.enhanceFormattedValue=function(){switch(this.getKey()){case"TODAY":case"YESTERDAY":case"TOMORROW":case"FIRSTDAYWEEK":case"LASTDAYWEEK":case"FIRSTDAYMONTH":case"LASTDAYMONTH":case"FIRSTDAYQUARTER":case"LASTDAYQUARTER":case"FIRSTDAYYEAR":case"LASTDAYYEAR":case"THISWEEK":case"THISMONTH":case"THISQUARTER":case"THISYEAR":case"LASTWEEK":case"LASTMONTH":case"LASTQUARTER":case"LASTYEAR":case"NEXTWEEK":case"NEXTMONTH":case"NEXTQUARTER":case"NEXTYEAR":case"YEARTODATE":case"DATETOYEAR":case"QUARTER1":case"QUARTER2":case"QUARTER3":case"QUARTER4":return true;default:return false}};o.prototype._getXPeriodTitle=function(e){var t,a=this.getKey();if(e.length===1){return L.getText("DYNAMIC_DATE_"+a+"_TITLE")}t=e.map(function(e){return L.getText("DYNAMIC_DATE_"+e.toUpperCase())}).join(" / ");if(a.indexOf("LAST")===0){return L.getText("DYNAMIC_DATE_LASTX_TITLE",t)}if(a.indexOf("NEXT")===0){return L.getText("DYNAMIC_DATE_NEXTX_TITLE",t)}};function h(e){return new T({text:L.getText("DYNAMIC_DATE_"+e.toUpperCase())})}return o});