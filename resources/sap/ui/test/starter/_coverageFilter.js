/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";function n(n,r){var t=n==null?undefined:n;var u=r==null?undefined:r;var i=false;return function(n){try{var r=window["sap-ui-qunit-coverage-shouldBeInstrumented"];if(typeof r!=="function"){throw new Error("qunit-coverage-istanbul.js has not exposed its coverage matcher")}return r(n,t,u)}catch(n){if(!i){i=true;e.warning("Invalid coverage filter pattern; affected modules stay bundled and "+"uninstrumented. Check the test's cover-only/cover-never configuration.",String(n),"sap.ui.test.starter._coverageFilter")}return false}}}function r(e,r,t){if(t===""||t==="true"){return n(undefined,undefined)}var u=n(e,r);if(t&&t!=="false"){var i=n(t,undefined);return function(e){return u(e)||i(e)}}return u}return{buildCoverageIgnore:n,buildSingleFileIgnore:r}});
//# sourceMappingURL=_coverageFilter.js.map