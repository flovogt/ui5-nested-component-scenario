/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/Object","sap/base/util/UriParameters","sap/base/Log","sap/ui/support/RuleAnalyzer","sap/ui/support/library"],function(e,s,t,r,i,a){"use strict";var o=s.extend("sap.ui.core.support.RuleEngineOpaExtension",{metadata:{publicMethods:["getAssertions"]},onAfterInit:function(){var s=sap.ui.getCore().getLoadedLibraries()["sap.ui.support"],t=e.Deferred();if(!s){sap.ui.require(["sap/ui/support/Bootstrap"],function(e){e.initSupportRules(["true","silent"],{onReady:function(){t.resolve()}})},function(e){r.error("Could not load module 'sap/ui/support/Bootstrap':",e)})}else{t.resolve()}return t.promise()},getAssertions:function(){var s=function(){return t.fromQuery(window.location.search).get("sap-skip-rules-issues")=="true"};var r=function(){var e=window.parent;e._$files=e._$files||[];return e};var n={noRuleFailures:function(t){t=t||{};var r=e.Deferred(),a=t["failOnAnyIssues"],o=t["failOnHighIssues"],n=t.rules,u=t.preset,p=t.metadata,l=t.executionScope;i.analyze(l,n||u,p).then(function(){var e=i.getAnalysisHistory(),t={issues:[]};if(e.length){t=e[e.length-1]}var n=t.issues.reduce(function(e,s){e[s.severity.toLowerCase()]+=1;return e},{high:0,medium:0,low:0});var u=t.issues.length===0;if(o){u=n.high===0}else if(a===false||o===false){u=true}if(s()){u=true}r.resolve({result:u,message:"Support Assistant issues found: [High: "+n.high+", Medium: "+n.medium+", Low: "+n.low+"]",expected:"0 high 0 medium 0 low",actual:n.high+" high "+n.medium+" medium "+n.low+" low"})});return r.promise()},getFinalReport:function(){var t=e.Deferred(),r=i.getFormattedAnalysisHistory(),a=i.getAnalysisHistory(),o=a.reduce(function(e,s){return e+s.issues.length},0),n=o===0,u="Support Assistant Analysis History",p=u;if(n){u+=" - no issues found"}else if(s()){n=true;u+=' - issues are found. To see them remove the "sap-skip-rules-issues=true" URI parameter'}t.resolve({result:n,message:u,actual:p,expected:r});return t.promise()},getReportAsFileInFormat:function(s){var t,n,u=s||{},p=e.Deferred(),l=u["historyFormat"],f=u["fileName"];switch(l){case a.HistoryFormats.Abap:if(!f){f="abap-report.support-assistant.json"}n=i.getFormattedAnalysisHistory(l);break;case a.HistoryFormats.String:if(!f){f="string-report.support-assistant.json"}n=i.getFormattedAnalysisHistory(l);break;default:if(!f){f="report.support-assistant.json"}n=i.getAnalysisHistory()}f=o._formatFileName(f);t=r();t._$files[t._$files.length]={name:f,content:JSON.stringify(n)};p.resolve({result:true,message:"Support Assistant Analysis History was stored in window._$files with following name "+f,actual:true,expected:true});return p.promise()}};return n}});o._formatFileName=function(e){var s="";if(/\.support-assistant.json$/i.test(e)){s=e}else if(/\.json$/i.test(e)){s=e.replace(/\.json$/i,".support-assistant.json")}else{s=e+".support-assistant.json"}if(e!==s){r.warning("Attempt to save report in file with name "+e+". Name changed to "+s+".")}return s};return o});