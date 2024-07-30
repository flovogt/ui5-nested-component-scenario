//@ui5-bundle my/lib/sample/products/Component-preload.js
sap.ui.predefine("my/lib/sample/products/Component", ["my/lib/sample/base/Component","sap/ui/core/Component"],(t,e)=>{"use strict";return t.extend("my.lib.sample.products.Component",{metadata:{manifest:"json",interfaces:["sap.ui.core.IAsyncContentCreation"]},init(...n){t.prototype.init.apply(this,n);const o=e.getOwnerComponentFor(this);if(!o){this.attachEvent("toProduct",t=>{const e=t.getParameter("productID");this.getRouter().navTo("detailRoute",{id:e})},this)}}})});
sap.ui.predefine("my/lib/sample/products/controller/App.controller", ["sap/ui/core/mvc/Controller"],e=>{"use strict";return e.extend("my.lib.sample.products.controller.App",{})});
sap.ui.predefine("my/lib/sample/products/controller/Detail.controller", ["my/lib/sample/base/BaseController","sap/base/Log"],(e,t)=>{"use strict";return e.extend("my.lib.sample.products.controller.Detail",{onInit(...t){e.prototype.onInit.apply(this,t);this.getOwnerComponent().getRouter().getRoute("detailRoute").attachPatternMatched(this._onMatched,this)},_onMatched(e){t.info(this.getView().getControllerName(),"_onMatched");const o=e.getParameter("arguments");this.getOwnerComponent().getModel().metadataLoaded().then(this._bindData.bind(this,o.id))},_bindData(e){t.info(this.getView().getControllerName(),"_bindData");const o=this.getOwnerComponent().getModel().createKey("Products",{ProductID:e}),n=this;this.getView().bindElement({path:"/"+o,parameters:{expand:"Supplier,Category"},events:{change(){t.info(n.getView().getControllerName(),"_bindData change");n.getView().setBusy(false)},dataRequested(){t.info(n.getView().getControllerName(),"_bindData dataRequested");n.getView().setBusy(true)},dataReceived(){t.info(n.getView().getControllerName(),"_bindData dataReceived");n.getView().setBusy(false);if(n.getView().getBindingContext()===null){n.getOwnerComponent().getRouter().getTargets().display("notFound")}}}})},onPressSupplier(e){t.info(this.getView().getControllerName(),`onPressSupplier ${e.getSource().getBindingContext().getObject().SupplierID}`);const o=this.getOwnerComponent(),n=o.getModel(),i=e.getSource().getBindingContext(),r=i.getProperty("SupplierID");o.fireEvent("toSupplier",{supplierID:r,supplierKey:encodeURIComponent(`/${n.createKey("Suppliers",{SupplierID:r})}`)})},onPressCategory(e){t.info(this.getView().getControllerName(),`onPressCategory ${e.getSource().getBindingContext().getObject().CategoryID}`);const o=this.getOwnerComponent(),n=o.getModel(),i=e.getSource().getBindingContext(),r=i.getProperty("CategoryID");o.fireEvent("toCategory",{categoryID:r,categoryKey:encodeURIComponent(`/${n.createKey("Categories",{CategoryID:r})}`)})}})});
sap.ui.predefine("my/lib/sample/products/controller/List.controller", ["my/lib/sample/base/BaseController","sap/m/ColumnListItem","sap/m/Text","sap/base/Log","sap/ui/model/type/Currency"],(e,t,n,o,s)=>{"use strict";return e.extend("my.lib.sample.products.controller.List",{onInit(...t){e.prototype.onInit.apply(this,t);this.getOwnerComponent().getRouter().getRoute("listRoute").attachMatched(this._onMatched,this)},_onMatched(e){const o=e.getParameter("arguments"),r=`${decodeURIComponent(o.basepath||"")}/Products`,a=this.getView().byId("table"),i=this;a.bindItems({path:r,parameters:{expand:"Supplier"},template:new t({type:"Navigation",press:i.onPressListItem.bind(i),cells:[new n({text:"{ProductID}"}),new n({text:"{ProductName}"}),new n({text:"{Supplier/CompanyName}"}),new n({text:{parts:[{path:"UnitPrice"},{value:"$"}],type:new s({currencyCode:false})}})]})})},onPressListItem(e){o.info(this.getView().getControllerName(),"onPressListItem");const t=e.getSource().getBindingContext().getProperty("ProductID");this.getOwnerComponent().fireEvent("toProduct",{productID:t})}})});
sap.ui.predefine("my/lib/sample/products/localService/mockserver", ["sap/ui/core/util/MockServer","sap/ui/model/json/JSONModel","sap/base/Log","sap/base/util/UriParameters"],(e,t,r,a)=>{"use strict";let o;const s="my/lib/sample/products/",i=`${s}localService/mockdata`,n={init(n){const u=n||{};return new Promise((n,c)=>{const p=sap.ui.require.toUrl(`${s}manifest.json`),l=new t(p);l.attachRequestCompleted(()=>{const t=new a(window.location.href),c=sap.ui.require.toUrl(i),p=l.getProperty("/sap.app/dataSources/mainService"),d=sap.ui.require.toUrl(s+p.settings.localUri),m=/.*\/$/u.test(p.uri)?p.uri:`${p.uri}/`;if(!o){o=new e({rootUri:m})}else{o.stop()}e.config({autoRespond:true,autoRespondAfter:u.delay||t.get("serverDelay")||500});o.simulate(d,{sMockdataBaseUrl:c,bGenerateMissingMockData:true});const f=o.getRequests(),g=(e,t,r)=>{r.response=r=>{r.respond(e,{"Content-Type":"text/plain;charset=utf-8"},t)}};if(u.metadataError||t.get("metadataError")){f.forEach(e=>{if(e.path.toString().indexOf("$metadata")>-1){g(500,"metadata Error",e)}})}const h=u.errorType||t.get("errorType"),q=h==="badRequest"?400:500;if(h){f.forEach(e=>{g(q,h,e)})}o.setRequests(f);o.start();r.info("Running the app with mock data");n()});l.attachRequestFailed(()=>{const e="Failed to load application manifest";r.error(e);c(new Error(e))})})},getMockServer(){return o}};return n});
sap.ui.require.preload({
	"my/lib/sample/products/i18n/i18n.properties":'appTitle=Product Component\nappDescription=Product Reusable Component\n\nlistViewTitle=Product List View\ndetailViewTitle=Product Detail View',
	"my/lib/sample/products/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"my.lib.sample.products","type":"application","i18n":{"bundleUrl":"i18n/i18n.properties","supportedLocales":[""],"fallbackLocale":""},"title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"dataSources":{"mainService":{"uri":"/myservice/V2/Northwind.svc","type":"OData","settings":{"odataVersion":"2.0","localUri":"localService/metadata.xml"}}}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"contentDensities":{"cozy":true,"compact":true},"rootView":{"viewName":"my.lib.sample.products.view.App","type":"XML","id":"app"},"dependencies":{"minUI5Version":"1.75.0","libs":{"sap.ui.core":{},"sap.ui.layout":{},"sap.m":{}},"components":{"my.lib.sample.base":{}}},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"my.lib.sample.products.i18n.i18n","supportedLocales":[""],"fallbackLocale":""}},"":{"dataSource":"mainService","preload":true,"settings":{"useBatch":false,"defaultCountMode":"Inline","defaultBindingMode":"TwoWay"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","path":"my.lib.sample.products.view","controlId":"app","controlAggregation":"pages","transition":"slide","bypassed":{"target":"notFoundTarget"}},"routes":[{"name":"listRoute","pattern":":basepath:","target":"listTarget"},{"name":"detailRoute","pattern":"detail/{id}","target":"detailTarget"}],"targets":{"listTarget":{"type":"View","id":"list","name":"List","title":"Products List"},"detailTarget":{"type":"View","id":"detail","name":"Detail","title":"{ProductName}"},"notFoundTarget":{"type":"View","id":"notFound","name":"NotFound","transition":"show"}}}}}',
	"my/lib/sample/products/view/App.view.xml":'<mvc:View controllerName="my.lib.sample.products.controller.App"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns="sap.m"\n\tdisplayBlock="true"><App id="app" /></mvc:View>\n',
	"my/lib/sample/products/view/Detail.view.xml":'<mvc:View controllerName="my.lib.sample.products.controller.Detail"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns="sap.m"\n\txmlns:l="sap.ui.layout"\n\txmlns:f="sap.ui.layout.form"\n\txmlns:core="sap.ui.core"\n\tdisplayBlock="true"\n\tbusyIndicatorDelay="0"\n\tbusy="true"><Page id="page"\n\t\tshowHeader="false"\n\t\tshowNavButton="false"\n\t\tenableScrolling="true"\n\t\tclass="sapUiContentPadding productsPage"><VBox ><f:Form id="FormDisplay354"\n\t\t\teditable="false" core:require="{Currency:\'sap/ui/model/type/Currency\'}"><f:title><core:Title text="{i18n>detailViewTitle}" /></f:title><f:layout><f:ResponsiveGridLayout labelSpanXL="3"\n\t\t\t\t\t\tlabelSpanL="3"\n\t\t\t\t\t\tlabelSpanM="3"\n\t\t\t\t\t\tlabelSpanS="12"\n\t\t\t\t\t\tadjustLabelSpan="false"\n\t\t\t\t\t\temptySpanXL="4"\n\t\t\t\t\t\temptySpanL="4"\n\t\t\t\t\t\temptySpanM="4"\n\t\t\t\t\t\temptySpanS="0"\n\t\t\t\t\t\tcolumnsXL="1"\n\t\t\t\t\t\tcolumnsL="1"\n\t\t\t\t\t\tcolumnsM="1"\n\t\t\t\t\t\tsingleContainerFullSize="false" /></f:layout><f:formContainers><f:FormContainer><f:FormElement label="ID"><f:fields><Text text="{ProductID}" /></f:fields></f:FormElement><f:FormElement label="Name"><f:fields><Text text="{ProductName}" /></f:fields></f:FormElement><f:FormElement label="Supplier"><f:fields><Link text="{Supplier/CompanyName}"\n\t\t\t\t\t\t\t\t\tpress="onPressSupplier" /></f:fields></f:FormElement><f:FormElement label="Price"><f:fields><Text text="{parts:[{path:\'UnitPrice\'}, {path:\'\',value:\'USD\'}], type:\'Currency\', formatOptions:{currencyCode: false}}" /></f:fields></f:FormElement><f:FormElement label="Quantity per Unit"><f:fields><Text text="{QuantityPerUnit}" /></f:fields></f:FormElement></f:FormContainer><f:FormContainer><f:FormElement label="Category"><f:fields><Link text="{Category/CategoryName}"\n\t\t\t\t\t\t\t\t\tpress="onPressCategory" /></f:fields></f:FormElement><f:FormElement label="Description"><f:fields><Text text="{Category/Description}" /></f:fields></f:FormElement><f:FormElement label="Image"><f:fields><Image src="{path:\'Category/Picture\', formatter:\'.base64StringToImage\'}" /></f:fields></f:FormElement></f:FormContainer></f:formContainers></f:Form></VBox></Page></mvc:View>\n',
	"my/lib/sample/products/view/List.view.xml":'<mvc:View controllerName="my.lib.sample.products.controller.List"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns="sap.m"\n\tdisplayBlock="true"><Page id="page"\n\t\tshowHeader="false"\n\t\tenableScrolling="true"\n\t\tclass="sapUiContentPadding productsPage"><Table id="table" inset="false" busyIndicatorDelay="0"><headerToolbar><OverflowToolbar><content><Title text="{i18n>listViewTitle}"\n\t\t\t\t\t\t\tlevel="H2" /><ToolbarSpacer /></content></OverflowToolbar></headerToolbar><columns><Column width="12em"><Text text="ID" /></Column><Column><Text text="Name" /></Column><Column><Text text="Supplier" /></Column><Column><Text text="Price" /></Column></columns></Table></Page></mvc:View>\n',
	"my/lib/sample/products/view/NotFound.view.xml":'<mvc:View xmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><MessagePage title="{i18n>detailViewTitle} Not Found"\n\t\ttext="This resource was not found"\n\t\tdescription="Check your code"\n\t\tclass="productsPage" /></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
