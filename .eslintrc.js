module.exports = {
    parser: '@typescript-eslint/parser',

    parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
    },

    extends: [
        'airbnb',
        'airbnb-typescript',
    ],

    env: {
        browser: true,
        node: true,
        jest: true,
    },

    rules: {
        '@typescript-eslint/indent': ['error', 4],
        'max-len': ['error', {
            code: 120,
            comments: 120,
            tabWidth: 4,
            ignoreUrls: false,
            ignoreTrailingComments: false,
            ignoreComments: false,
        }],
        'no-shadow': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'arrow-body-style': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'import/no-extraneous-dependencies': 0,
        indent: 0,
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'no-underscore-dangle': 'off',
        'react/destructuring-assignment': [
            'error',
            'always',
            {
                ignoreClassFields: true,
            },
        ],
        'class-methods-use-this': 'off',
    },
};
