/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/performance/trace/FESR","sap/base/Log","sap/base/util/UriParameters"],function(e,t,i){"use strict";return function(){var r=document.querySelector("meta[name=sap-ui-fesr]"),n=r?r.getAttribute("content"):undefined,s=!!n&&n!=="false",a=i.fromQuery(window.location.search).get("sap-ui-fesr"),u=n&&n!=="true"?n:undefined;if(a){s=a!="false";u=["true","false","x","X",undefined].indexOf(a)===-1?a:u}if(typeof window.performance.getEntriesByType==="function"){e.setActive(s,u)}else{t.debug("FESR is not supported in clients without support of window.Performance extensions.")}if(/sap-ui-xx-e2e-trace=(true|x|X)/.test(location.search)){sap.ui.require(["sap/ui/core/support/trace/E2eTraceLib"])}}});
//# sourceMappingURL=initTraces.js.map