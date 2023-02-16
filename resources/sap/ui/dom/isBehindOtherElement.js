/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/dom/isBehindOtherElement"],function(e){"use strict";function e(e){if(!e){return false}var t=e.getBoundingClientRect(),n=t.left+1,o=t.right-1,r=t.top+1,i=t.bottom-1;if(document.elementFromPoint(n,r)!==e&&!e.contains(document.elementFromPoint(n,r))){return true}if(document.elementFromPoint(o,r)!==e&&!e.contains(document.elementFromPoint(o,r))){return true}if(document.elementFromPoint(n,i)!==e&&!e.contains(document.elementFromPoint(n,i))){return true}if(document.elementFromPoint(o,i)!==e&&!e.contains(document.elementFromPoint(o,i))){return true}return false}return e});
//# sourceMappingURL=isBehindOtherElement.js.map