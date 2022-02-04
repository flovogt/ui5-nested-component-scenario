/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/LocaleData","./_Calendars"],function(e,t,r){"use strict";var a=e.extend("sap.ui.core.date.UniversalDate",{constructor:function(){var e=a.getClass();return this.createDate(e,arguments)}});a.UTC=function(){var e=a.getClass();return e.UTC.apply(e,arguments)};a.now=function(){return Date.now()};a.prototype.createDate=function(e,t){switch(t.length){case 0:return new e;case 1:return new e(t[0]instanceof Date?t[0].getTime():t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3]);case 5:return new e(t[0],t[1],t[2],t[3],t[4]);case 6:return new e(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}};a.getInstance=function(e,t){var r,n;if(e instanceof a){e=e.getJSDate()}else if(!e){e=new Date}if(!t){t=sap.ui.getCore().getConfiguration().getCalendarType()}r=a.getClass(t);n=Object.create(r.prototype);n.oDate=e;n.sCalendarType=t;return n};a.getClass=function(e){if(!e){e=sap.ui.getCore().getConfiguration().getCalendarType()}return r.get(e)};["getDate","getMonth","getFullYear","getYear","getDay","getHours","getMinutes","getSeconds","getMilliseconds","getUTCDate","getUTCMonth","getUTCFullYear","getUTCDay","getUTCHours","getUTCMinutes","getUTCSeconds","getUTCMilliseconds","getTime","valueOf","getTimezoneOffset","toString","toDateString","setDate","setFullYear","setYear","setMonth","setHours","setMinutes","setSeconds","setMilliseconds","setUTCDate","setUTCFullYear","setUTCMonth","setUTCHours","setUTCMinutes","setUTCSeconds","setUTCMilliseconds"].forEach(function(e){a.prototype[e]=function(){return this.oDate[e].apply(this.oDate,arguments)}});a.prototype.getJSDate=function(){return this.oDate};a.prototype.getCalendarType=function(){return this.sCalendarType};a.prototype.getEra=function(){return a.getEraByDate(this.sCalendarType,this.oDate.getFullYear(),this.oDate.getMonth(),this.oDate.getDate())};a.prototype.setEra=function(e){};a.prototype.getUTCEra=function(){return a.getEraByDate(this.sCalendarType,this.oDate.getUTCFullYear(),this.oDate.getUTCMonth(),this.oDate.getUTCDate())};a.prototype.setUTCEra=function(e){};a.prototype.getWeek=function(){return a.getWeekByDate(this.sCalendarType,this.getFullYear(),this.getMonth(),this.getDate())};a.prototype.setWeek=function(e){var t=a.getFirstDateOfWeek(this.sCalendarType,e.year||this.getFullYear(),e.week);this.setFullYear(t.year,t.month,t.day)};a.prototype.getUTCWeek=function(){return a.getWeekByDate(this.sCalendarType,this.getUTCFullYear(),this.getUTCMonth(),this.getUTCDate())};a.prototype.setUTCWeek=function(e){var t=a.getFirstDateOfWeek(this.sCalendarType,e.year||this.getFullYear(),e.week);this.setUTCFullYear(t.year,t.month,t.day)};a.prototype.getQuarter=function(){return Math.floor(this.getMonth()/3)};a.prototype.getUTCQuarter=function(){return Math.floor(this.getUTCMonth()/3)};a.prototype.getDayPeriod=function(){if(this.getHours()<12){return 0}else{return 1}};a.prototype.getUTCDayPeriod=function(){if(this.getUTCHours()<12){return 0}else{return 1}};a.prototype.getTimezoneShort=function(){if(this.oDate.getTimezoneShort){return this.oDate.getTimezoneShort()}};a.prototype.getTimezoneLong=function(){if(this.oDate.getTimezoneLong){return this.oDate.getTimezoneLong()}};var n=7*24*60*60*1e3;a.getWeekByDate=function(e,r,a,n){var i=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale(),g=t.getInstance(i),u=this.getClass(e),f=o(u,r),l=new u(u.UTC(r,a,n)),c,C,p,h,T;if(g.firstDayStartsFirstWeek()){c=s(f,l)}else{C=r-1;p=r+1;h=o(u,C);T=o(u,p);if(l>=T){r=p;c=0}else if(l<f){r=C;c=s(h,l)}else{c=s(f,l)}}return{year:r,week:c}};a.getFirstDateOfWeek=function(e,r,a){var s=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale(),i=t.getInstance(s),g=this.getClass(e),u=o(g,r),f=new g(u.valueOf()+a*n),l=i.firstDayStartsFirstWeek();if(l&&a===0&&u.getUTCFullYear()<r){return{year:r,month:0,day:1}}return{year:f.getUTCFullYear(),month:f.getUTCMonth(),day:f.getUTCDate()}};function o(e,r){var a=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale(),n=t.getInstance(a),o=n.getMinimalDaysInFirstWeek(),s=n.getFirstDayOfWeek(),i=new e(e.UTC(r,0,1)),g=7;while(i.getUTCDay()!==s){i.setUTCDate(i.getUTCDate()-1);g--}if(g<o){i.setUTCDate(i.getUTCDate()+7)}return i}function s(e,t){return Math.floor((t.valueOf()-e.valueOf())/n)}var i={};a.getEraByDate=function(e,t,r,a){var n=g(e),o=new Date(0).setUTCFullYear(t,r,a),s;for(var i=n.length-1;i>=0;i--){s=n[i];if(!s){continue}if(s._start&&o>=s._startInfo.timestamp){return i}if(s._end&&o<s._endInfo.timestamp){return i}}};a.getCurrentEra=function(e){var t=new Date;return this.getEraByDate(e,t.getFullYear(),t.getMonth(),t.getDate())};a.getEraStartDate=function(e,t){var r=g(e),a=r[t]||r[0];if(a._start){return a._startInfo}};function g(e){var r=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale(),a=t.getInstance(r),n=i[e];if(!n){var n=a.getEraDates(e);if(!n[0]){n[0]={_start:"1-1-1"}}for(var o=0;o<n.length;o++){var s=n[o];if(!s){continue}if(s._start){s._startInfo=u(s._start)}if(s._end){s._endInfo=u(s._end)}}i[e]=n}return n}function u(e){var t=e.split("-"),r,a,n;if(t[0]==""){r=-parseInt(t[1]);a=parseInt(t[2])-1;n=parseInt(t[3])}else{r=parseInt(t[0]);a=parseInt(t[1])-1;n=parseInt(t[2])}return{timestamp:new Date(0).setUTCFullYear(r,a,n),year:r,month:a,day:n}}return a});