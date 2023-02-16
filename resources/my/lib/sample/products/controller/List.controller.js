sap.ui.define(["my/lib/sample/base/BaseController","sap/m/ColumnListItem","sap/m/Text","sap/base/Log","sap/ui/model/type/Currency"],function(e,t,n,o,r){"use strict";return e.extend("my.lib.sample.products.controller.List",{onInit:function(){e.prototype.onInit.apply(this,arguments);this.getOwnerComponent().getRouter().getRoute("listRoute").attachMatched(this._onMatched,this)},_onMatched:function(e){var o=e.getParameter("arguments");var s=decodeURIComponent(o.basepath||"")+"/Products";var a=this.getView().byId("table");var i=this;a.bindItems({path:s,parameters:{expand:"Supplier"},template:new t({type:"Navigation",press:i.onPressListItem.bind(i),cells:[new n({text:"{ProductID}"}),new n({text:"{ProductName}"}),new n({text:"{Supplier/CompanyName}"}),new n({text:{parts:[{path:"UnitPrice"},{value:"$"}],type:new r({currencyCode:false})}})]})})},onPressListItem:function(e){o.info(this.getView().getControllerName(),"onPressListItem");var t=e.getSource().getBindingContext().getProperty("ProductID");this.getOwnerComponent().fireEvent("toProduct",{productID:t})}})});
//# sourceMappingURL=List.controller.js.map