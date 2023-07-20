//@ui5-bundle my/lib/sample/suppliers/Component-preload.js
sap.ui.require.preload({
	"my/lib/sample/suppliers/Component.js":function(){
sap.ui.define(["my/lib/sample/base/Component"],function(e){"use strict";return e.extend("my.lib.sample.suppliers.Component",{metadata:{manifest:"json",interfaces:["sap.ui.core.IAsyncContentCreation"]},eventMappings:{productsComponent:[{name:"toProduct",forward:"toProduct"}]}})});
},
	"my/lib/sample/suppliers/controller/App.controller.js":function(){
sap.ui.define(["my/lib/sample/base/BaseController"],function(e){"use strict";return e.extend("my.lib.sample.suppliers.controller.App",{})});
},
	"my/lib/sample/suppliers/controller/Detail.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","sap/base/Log"],function(e,t){"use strict";return e.extend("my.lib.sample.suppliers.controller.Detail",{onInit:function(){this.getOwnerComponent().getRouter().getRoute("detailRoute").attachMatched(this._onMatched,this)},_onMatched:function(e){t.info(this.getView().getControllerName(),"_onMatched");var i=e.getParameter("arguments");this.getOwnerComponent().getModel().metadataLoaded().then(this._bindData.bind(this,i.id))},_bindData:function(e){t.info(this.getView().getControllerName(),"_bindData");var i=this.getOwnerComponent().getModel().createKey("Suppliers",{SupplierID:e});this.getView().bindElement({path:"/"+i,events:{change:function(){t.info(this.getView().getControllerName(),"_bindData change");this.getView().setBusy(false)}.bind(this),dataRequested:function(){t.info(this.getView().getControllerName(),"_bindData dataRequested");this.getView().setBusy(true)}.bind(this),dataReceived:function(){t.info(this.getView().getControllerName(),"_bindData dataReceived");this.getView().setBusy(false);if(this.getView().getBindingContext()===null){this.getOwnerComponent().getRouter().getTargets().display("notFound")}}.bind(this)}})}})});
},
	"my/lib/sample/suppliers/controller/List.controller.js":function(){
sap.ui.define(["my/lib/sample/base/BaseController","sap/base/Log"],function(e,t){"use strict";return e.extend("my.lib.sample.suppliers.controller.List",{onPressListItem:function(e){t.info(this.getView().getControllerName(),"onPressListItem");var o=e.getSource().getBindingContext();this.getOwnerComponent().getRouter().navTo("detailRoute",{id:o.getProperty("SupplierID")},{productsTarget:{route:"listRoute",parameters:{basepath:encodeURIComponent(o.getPath())}}})}})});
},
	"my/lib/sample/suppliers/i18n/i18n.properties":'appTitle=Supplier Component\nappDescription=Supplier Reusable Component\n\nlistViewTitle=Suppliers\ndetailViewTitle=Supplier Details\nproductListTitle=Products',
	"my/lib/sample/suppliers/localService/mockserver.js":function(){
sap.ui.define(["sap/ui/core/util/MockServer","sap/ui/model/json/JSONModel","sap/base/Log","sap/base/util/UriParameters"],function(e,t,r,a){"use strict";var i,o="my/lib/sample/suppliers/",n=o+"localService/mockdata";var s={init:function(s){var u=s||{};return new Promise(function(s,c){var p=sap.ui.require.toUrl(o+"manifest.json"),l=new t(p);l.attachRequestCompleted(function(){var t=new a(window.location.href),c=sap.ui.require.toUrl(n),p=l.getProperty("/sap.app/dataSources/mainService"),f=sap.ui.require.toUrl(o+p.settings.localUri),d=/.*\/$/.test(p.uri)?p.uri:p.uri+"/";if(!i){i=new e({rootUri:d})}else{i.stop()}e.config({autoRespond:true,autoRespondAfter:u.delay||t.get("serverDelay")||500});i.simulate(f,{sMockdataBaseUrl:c,bGenerateMissingMockData:true});var m=i.getRequests();var v=function(e,t,r){r.response=function(r){r.respond(e,{"Content-Type":"text/plain;charset=utf-8"},t)}};if(u.metadataError||t.get("metadataError")){m.forEach(function(e){if(e.path.toString().indexOf("$metadata")>-1){v(500,"metadata Error",e)}})}var g=u.errorType||t.get("errorType"),h=g==="badRequest"?400:500;if(g){m.forEach(function(e){v(h,g,e)})}i.setRequests(m);i.start();r.info("Running the app with mock data");s()});l.attachRequestFailed(function(){var e="Failed to load application manifest";r.error(e);c(new Error(e))})})},getMockServer:function(){return i}};return s});
},
	"my/lib/sample/suppliers/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"my.lib.sample.suppliers","type":"application","i18n":{"bundleUrl":"i18n/i18n.properties","supportedLocales":[""],"fallbackLocale":""},"title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"dataSources":{"mainService":{"uri":"/myservice/V2/Northwind.svc","type":"OData","settings":{"odataVersion":"2.0","localUri":"localService/metadata.xml"}}}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"contentDensities":{"cozy":true,"compact":true},"rootView":{"viewName":"my.lib.sample.suppliers.view.App","type":"XML","id":"app"},"componentUsages":{"productsComponent":{"name":"my.lib.sample.products","settings":{},"componentData":{},"lazy":true}},"dependencies":{"minUI5Version":"1.75.0","libs":{"sap.ui.core":{},"sap.ui.layout":{},"sap.m":{}},"components":{"my.lib.sample.base":{}}},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"my.lib.sample.suppliers.i18n.i18n","supportedLocales":[""],"fallbackLocale":""}},"":{"dataSource":"mainService","preload":true,"settings":{"useBatch":false,"defaultCountMode":"Inline","defaultBindingMode":"TwoWay"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","path":"my.lib.sample.suppliers.view","controlId":"app","controlAggregation":"pages","transition":"slide","bypassed":{"target":"notFoundTarget"}},"routes":[{"name":"listRoute","pattern":"","target":"listTarget"},{"name":"detailRoute","pattern":"detail/{id}","target":{"name":"productsTarget","prefix":"p"}}],"targets":{"listTarget":{"type":"View","id":"list","name":"List","title":"Supplier List"},"detailTarget":{"type":"View","id":"detail","name":"Detail","title":"{CompanyName}"},"productsTarget":{"type":"Component","usage":"productsComponent","parent":"detailTarget","controlId":"box","controlAggregation":"items","id":"productInSupplier"},"notFoundTarget":{"type":"View","id":"notFound","name":"NotFound","transition":"show"}}}}}',
	"my/lib/sample/suppliers/view/App.view.xml":'<mvc:View controllerName="my.lib.sample.suppliers.controller.App"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns="sap.m"\n\tdisplayBlock="true"><App id="app" /></mvc:View>\n',
	"my/lib/sample/suppliers/view/Detail.view.xml":'<mvc:View controllerName="my.lib.sample.suppliers.controller.Detail"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns="sap.m"\n\txmlns:l="sap.ui.layout"\n\txmlns:f="sap.ui.layout.form"\n\txmlns:core="sap.ui.core"\n\tdisplayBlock="true"\n\tbusyIndicatorDelay="0"\n\tbusy="true"><Page id="page"\n\t\tshowHeader="false"\n\t\tshowNavButton="false"\n\t\tenableScrolling="true"\n\t\tclass="sapUiContentPadding suppliersPage"><VBox id="box"><f:Form id="FormDisplay354"\n\t\t\t\teditable="false"><f:title><core:Title text="{i18n>detailViewTitle}" /></f:title><f:layout><f:ResponsiveGridLayout labelSpanXL="3"\n\t\t\t\t\t\tlabelSpanL="3"\n\t\t\t\t\t\tlabelSpanM="3"\n\t\t\t\t\t\tlabelSpanS="12"\n\t\t\t\t\t\tadjustLabelSpan="false"\n\t\t\t\t\t\temptySpanXL="4"\n\t\t\t\t\t\temptySpanL="4"\n\t\t\t\t\t\temptySpanM="4"\n\t\t\t\t\t\temptySpanS="0"\n\t\t\t\t\t\tcolumnsXL="1"\n\t\t\t\t\t\tcolumnsL="1"\n\t\t\t\t\t\tcolumnsM="1"\n\t\t\t\t\t\tsingleContainerFullSize="false" /></f:layout><f:formContainers><f:FormContainer><f:FormElement label="ID"><f:fields><Text text="{SupplierID}" /></f:fields></f:FormElement><f:FormElement label="Name"><f:fields><Text text="{CompanyName}" /></f:fields></f:FormElement><f:FormElement label="Address"><f:fields><Text text="{Address}" /></f:fields></f:FormElement><f:FormElement label="ZIP Code/City"><f:fields><Text text="{PostalCode} {City}" /></f:fields></f:FormElement><f:FormElement label="State"><f:fields><Text text="{Region}" /></f:fields></f:FormElement><f:FormElement label="Country"><f:fields><Text text="{Country}" /></f:fields></f:FormElement><f:FormElement label="Phone"><f:fields><Text text="{Phone}" /></f:fields></f:FormElement></f:FormContainer></f:formContainers></f:Form></VBox></Page></mvc:View>\n',
	"my/lib/sample/suppliers/view/List.view.xml":'<mvc:View controllerName="my.lib.sample.suppliers.controller.List"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns="sap.m"\n\tdisplayBlock="true"><Page id="page"\n\t\tshowHeader="false"\n\t\tenableScrolling="true"\n\t\tclass="sapUiContentPadding suppliersPage"><Table inset="false"\n\t\t\tbusyIndicatorDelay="0"\n\t\t\titems="{/Suppliers}"><headerToolbar><OverflowToolbar><content><Title text="{i18n>listViewTitle}"\n\t\t\t\t\t\t\tlevel="H2" /><ToolbarSpacer /></content></OverflowToolbar></headerToolbar><columns><Column width="12em"><Text text="ID" /></Column><Column><Text text="Name" /></Column><Column><Text text="City" /></Column></columns><items><ColumnListItem type="Navigation"\n\t\t\t\t\tpress="onPressListItem"><cells><Text text="{SupplierID}" /><Text text="{CompanyName}" /><Text text="{City}" /></cells></ColumnListItem></items></Table></Page></mvc:View>\n',
	"my/lib/sample/suppliers/view/NotFound.view.xml":'<mvc:View xmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><MessagePage title="{i18n>detailViewTitle} Not Found"\n\t\ttext="This resource was not found"\n\t\tdescription="Check your code"\n\t\tclass="suppliersPage" /></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map