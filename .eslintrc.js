module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/essential",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"@vue/prettier",
		"@vue/prettier/@typescript-eslint",
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"linebreak-style": "off",
		"prettier/prettier": [
			"error", { "endOfLine": "auto" }
		],
		"@typescript-eslint/explicit-module-boundary-types": [
			"error", { "allowedNames": ["created"] }
		],
		"no-unused-expressions": "error",
		"vue/valid-v-slot": ["error", {
			"allowModifiers": true
		}]
	},
};
