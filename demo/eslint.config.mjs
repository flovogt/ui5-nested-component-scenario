import js from "@eslint/js";

export default [
	js.configs.recommended,
	js.configs.all,
	{
		languageOptions: {
			globals: {
				jQuery: true,
				sap: true,
				window: true
			},
			sourceType: "script"
		},
		rules: {
			"no-negated-condition": "off",
			"no-magic-numbers": "off",
			"no-ternary": "off",
			"no-underscore-dangle": ["error", { "allowAfterThis": true }],
			"one-var": ["off"],
			"max-lines-per-function": ["error", 300],
			"max-params": ["error", 5],
			"max-statements": ["error", 16],
			"prefer-template": ["off"],
			"sort-keys": "off",
			"sort-vars": "off",
			"line-comment-position": "off",
			"no-inline-comments": "off"
		}
	}
]
