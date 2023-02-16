//@ui5-bundle my/lib/sample/base/Component-preload.js
sap.ui.require.preload({
	"my/lib/sample/base/BaseController.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","sap/base/Log"],function(e,n){"use strict";return e.extend("my.lib.sample.base.BaseController",{onInit:function(){n.info(this.getView().getControllerName(),"onInit")},base64StringToImage:function(e){return e?"data:image/bmp;base64,"+e:null}})});
},
	"my/lib/sample/base/Component.js":function(){
sap.ui.define(["sap/ui/core/UIComponent","sap/base/util/deepClone"],function(e,t){"use strict";return e.extend("my.lib.sample.base.Component",{init:function(){e.prototype.init.apply(this,arguments);var t=this.getRouter();t.getViews().attachCreated(this._processEventMappingOnTargetCreated,this);t.initialize()},_processEventMappingOnTargetCreated:function(e){if(!this.eventMappings){return}var a=e.getParameter("type");var r=e.getParameter("object");var n=e.getParameter("options");var i=this;var o;function s(e,t){Object.keys(e).forEach(function(a){var r=e[a];if(r.parameters){Object.keys(r.parameters).forEach(function(e){var a=r.parameters[e];var n=t.getParameter(a);r.parameters[e]=n})}if(r.componentTargetInfo){s(r.componentTargetInfo,t)}})}if(a==="Component"){o=this.eventMappings[n.usage];if(Array.isArray(o)){o.forEach(function(e){r.attachEvent(e.name,function(a){var r;if(e.route){if(e.componentTargetInfo){r=t(e.componentTargetInfo);s(r,a)}i.getRouter().navTo(e.route,{},r)}else if(e.forward){i.fireEvent(e.forward,a.getParameters())}})})}}}})});
},
	"my/lib/sample/base/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"my.lib.sample.base","type":"library","embeds":[],"applicationVersion":{"version":"0.0.1"},"title":"The my.lib.sample.base","description":"The my.lib.sample.base","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":[],"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"contentDensities":{"cozy":true,"compact":true},"dependencies":{"minUI5Version":"1.75.0","libs":{"sap.ui.core":{"minVersion":"1.75.0"}}},"library":{"i18n":false,"css":false,"content":{"controls":[],"elements":[],"types":[],"interfaces":[]}}}}'
});
//# sourceMappingURL=Component-preload.js.map
