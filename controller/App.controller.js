sap.ui.define(["my/lib/sample/base/BaseController","sap/base/Log","sap/ui/model/json/JSONModel"],(e,t,o)=>{"use strict";return e.extend("my.lib.sample.root.controller.App",{onInit(){t.info(this.getView().getControllerName(),"onInit");this.getOwnerComponent().getRouter().attachRouteMatched(this._onRouteMatched,this);this.getOwnerComponent().getRouter().attachBypassed(this._onBypassed,this);const e=new o;this.getView().setModel(e,"titleModel");this.getOwnerComponent().getRouter().attachTitleChanged(t=>{e.setData(t.getParameters())})},_onRouteMatched(e){t.info(this.getView().getControllerName(),"_onRouteMatched");const o=e.getParameter("config");this.setSelectedMenuItem(o.name)},setSelectedMenuItem(e){this.byId("navigationList").setSelectedKey(e)},_onBypassed(e){const o=e.getParameter("hash");t.info(this.getView().getControllerName(),`_onBypassed Hash=${o}`)},onItemSelect(e){const o=e.getParameter("item").getKey();t.info(this.getView().getControllerName(),`onItemSelect Key=${o}`);this.getOwnerComponent().getRouter().navTo(o)}})});
//# sourceMappingURL=App.controller.js.map