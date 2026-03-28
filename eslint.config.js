import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    // Note: .eslintignore is merged in config.
    {
        ignores: [
            'node_modules',
            'dist',
            'build',
            'tailwind.config.js',
            'vite.config.ts',
            '**/src/graphql/types.tsx',
            '**/src/graphql/desmos_profile.ts'
        ]
    },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: Object.fromEntries(Object.entries(globals.browser).map(([k, v]) => [k.trim(), v]))
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // Warns when anonymous component exported
            '@typescript-eslint/no-explicit-any': 'warn', // Warns when type 'any' used
            '@typescript-eslint/no-unused-vars': 'warn', // Warns when defined variable is not used
            '@typescript-eslint/no-unused-expressions': 'warn', // Warns when defined expression is not used
            'no-extra-boolean-cast': 'off' // Warns when !!<var> is used. (Not always useful)
        }
    }
);
