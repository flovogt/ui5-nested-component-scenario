sap.ui.define(["my/lib/sample/base/BaseController"],function(e){"use strict";QUnit.module("Base Controller");QUnit.test("I should test the image formatter",function(t){var a=new e;t.strictEqual(a.base64StringToImage("335463536"),"data:image/bmp;base64,335463536","The base64 string is formatted to a valid HTML image string");t.strictEqual(a.base64StringToImage(null),null,"The base64 string is formatted to 'null' because given value is 'null'");t.strictEqual(a.base64StringToImage(undefined),null,"The base64 string is formatted to 'undefined' because given value is 'null'")})});
//# sourceMappingURL=BaseController.js.map