sap.ui.define(["my/lib/sample/base/Component","sap/ui/core/Component"],(t,e)=>{"use strict";return t.extend("my.lib.sample.products.Component",{metadata:{manifest:"json",interfaces:["sap.ui.core.IAsyncContentCreation"]},init(...n){t.prototype.init.apply(this,n);const o=e.getOwnerComponentFor(this);if(!o){this.attachEvent("toProduct",t=>{const e=t.getParameter("productID");this.getRouter().navTo("detailRoute",{id:e})},this)}}})});
//# sourceMappingURL=Component.js.map