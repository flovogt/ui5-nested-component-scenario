sap.ui.define(["sap/ui/core/util/MockServer","sap/ui/model/json/JSONModel","sap/base/Log","sap/base/util/UriParameters"],(e,t,r,a)=>{"use strict";let o;const s="my/lib/sample/categories/",i=`${s}localService/mockdata`,n={init(n){const u=n||{};return new Promise((n,c)=>{const p=sap.ui.require.toUrl(`${s}manifest.json`),l=new t(p);l.attachRequestCompleted(()=>{const t=new a(window.location.href),c=sap.ui.require.toUrl(i),p=l.getProperty("/sap.app/dataSources/mainService"),d=sap.ui.require.toUrl(s+p.settings.localUri),m=/.*\/$/u.test(p.uri)?p.uri:`${p.uri}/`;if(!o){o=new e({rootUri:m})}else{o.stop()}e.config({autoRespond:true,autoRespondAfter:u.delay||t.get("serverDelay")||500});o.simulate(d,{sMockdataBaseUrl:c,bGenerateMissingMockData:true});const f=o.getRequests(),g=(e,t,r)=>{r.response=r=>{r.respond(e,{"Content-Type":"text/plain;charset=utf-8"},t)}};if(u.metadataError||t.get("metadataError")){f.forEach(e=>{if(e.path.toString().indexOf("$metadata")>-1){g(500,"metadata Error",e)}})}const h=u.errorType||t.get("errorType"),q=h==="badRequest"?400:500;if(h){f.forEach(e=>{g(q,h,e)})}o.setRequests(f);o.start();r.info("Running the app with mock data");n()});l.attachRequestFailed(()=>{const e="Failed to load application manifest";r.error(e);c(new Error(e))})})},getMockServer(){return o}};return n});
//# sourceMappingURL=mockserver.js.map