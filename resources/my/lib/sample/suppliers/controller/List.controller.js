sap.ui.define(["my/lib/sample/base/BaseController","sap/base/Log"],(e,t)=>{"use strict";return e.extend("my.lib.sample.suppliers.controller.List",{onPressListItem(e){t.info(this.getView().getControllerName(),"onPressListItem");const o=e.getSource().getBindingContext();this.getOwnerComponent().getRouter().navTo("detailRoute",{id:o.getProperty("SupplierID")},{productsTarget:{route:"listRoute",parameters:{basepath:encodeURIComponent(o.getPath())}}})}})});
//# sourceMappingURL=List.controller.js.map