/*global QUnit*/

sap.ui.define([
	"my/lib/sample/base/BaseController"
], (BaseController) => {
	"use strict";

	QUnit.module("Base Controller");

	QUnit.test("I should test the image formatter", (assert) => {
		const oBaseController = new BaseController();
        assert.strictEqual(oBaseController.base64StringToImage("335463536"), "data:image/bmp;base64,335463536" , "The base64 string is formatted to a valid HTML image string");
        assert.strictEqual(oBaseController.base64StringToImage(null), null, "The base64 string is formatted to 'null' because given value is 'null'");
        assert.strictEqual(oBaseController.base64StringToImage(undefined), null, "The base64 string is formatted to 'undefined' because given value is 'null'");
	});

});