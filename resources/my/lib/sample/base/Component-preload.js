//@ui5-bundle my/lib/sample/base/Component-preload.js
sap.ui.require.preload({
	"my/lib/sample/base/BaseController.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","sap/base/Log"],(e,t)=>{"use strict";return e.extend("my.lib.sample.base.BaseController",{base64StringToImage(e){return e?`data:image/bmp;base64,${e}`:null},onInit(){t.info(this.getView().getControllerName(),"onInit")}})});
},
	"my/lib/sample/base/Component.js":function(){
sap.ui.define(["sap/ui/core/UIComponent","sap/base/util/deepClone"],(e,t)=>{"use strict";return e.extend("my.lib.sample.base.Component",{init(...t){e.prototype.init.apply(this,t);const a=this.getRouter();a.getViews().attachCreated(this._processEventMappingOnTargetCreated,this);a.initialize()},_processEventMappingOnTargetCreated(e){if(!this.eventMappings){return}const a=e.getParameter("type"),r=e.getParameter("object"),n=e.getParameter("options"),o=this,s=(e,t)=>{Object.keys(e).forEach(a=>{const r=e[a];if(r.parameters){Object.keys(r.parameters).forEach(e=>{const a=r.parameters[e],n=t.getParameter(a);r.parameters[e]=n})}if(r.componentTargetInfo){s(r.componentTargetInfo,t)}})};if(a==="Component"){const e=this.eventMappings[n.usage];if(Array.isArray(e)){e.forEach(e=>{r.attachEvent(e.name,a=>{let r={};if(e.route){if(e.componentTargetInfo){r=t(e.componentTargetInfo);s(r,a)}o.getRouter().navTo(e.route,{},r)}else if(e.forward){o.fireEvent(e.forward,a.getParameters())}})})}}}})});
},
	"my/lib/sample/base/library.js":function(){
sap.ui.define(()=>{"use strict";sap.ui.getCore().initLibrary({name:"my.lib.sample.base",version:"0.0.1",noLibraryCSS:true,dependencies:["sap.ui.core"],controls:[],types:[]});return my.lib.sample.base});
},
	"my/lib/sample/base/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"my.lib.sample.base","type":"library","embeds":[],"applicationVersion":{"version":"0.0.1"},"title":"The my.lib.sample.base","description":"The my.lib.sample.base","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":[],"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"contentDensities":{"cozy":true,"compact":true},"dependencies":{"minUI5Version":"1.75.0","libs":{"sap.ui.core":{"minVersion":"1.75.0"}}},"library":{"i18n":false,"css":false,"content":{"controls":[],"elements":[],"types":[],"interfaces":[]}}}}'
});
//# sourceMappingURL=Component-preload.js.map
