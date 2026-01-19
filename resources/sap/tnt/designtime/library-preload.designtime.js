//@ui5-bundle sap/tnt/designtime/library-preload.designtime.js
/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/tnt/designtime/NavigationList.designtime", [],function(){"use strict";return{aggregations:{items:{domRef:":sap-domref",actions:{move:"moveControls"}}}}});
/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/tnt/designtime/NavigationListGroup.designtime", [],function(){"use strict";return{palette:{group:"ACTION"},actions:{rename:{changeType:"rename",domRef:function(e){return e.$().find(".sapTntNLGroupText")[0]}}},templates:{create:"sap/tnt/designtime/NavigationListGroup.create.fragment.xml"}}});
/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/tnt/designtime/NavigationListItem.designtime", [],function(){"use strict";return{palette:{group:"ACTION"},actions:{rename:{changeType:"rename",domRef:function(e){return e.$().find(".sapTntNLText")[0]}}},templates:{create:"sap/tnt/designtime/NavigationListItem.create.fragment.xml"}}});
/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/tnt/designtime/library.designtime", [],function(){"use strict";return{}});
//# sourceMappingURL=library-preload.designtime.js.map
