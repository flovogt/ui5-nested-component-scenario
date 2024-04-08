import js from "@eslint/js";

export default [
	js.configs.recommended,
	js.configs.all,
	{
		languageOptions: {
			globals: {
				jQuery: true,
				sap: true
			}
		}
	}
]
