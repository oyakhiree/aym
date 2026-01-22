import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
    // Ignore dist folder
    {
        ignores: ['dist/**', 'node_modules/**', '**/*.d.ts']
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser
            }
        }
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            "vue/multi-word-component-names": "off",
            "vue/require-default-prop": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "no-undef": "off"
        }
    }
]
