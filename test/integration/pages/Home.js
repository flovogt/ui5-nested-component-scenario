sap.ui.define(["sap/ui/test/Opa5"],function(e){"use strict";var i="Home",s="homePage";e.createPageObjects({onTheHomePage:{viewName:i,actions:{},assertions:{iShouldSeeTheScreen:function(){return this.waitFor({id:s,success:function(){e.assert.ok(true,"The page with id '"+s+"' is displayed.")},errorMessage:"The page with id '"+s+"' can not be found."})}}}})});
//# sourceMappingURL=Home.js.map