import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'
import globals from 'globals'

export default [
    js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
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
            "no-unused-vars": "warn",
            "no-undef": "error"
        }
    }
]
