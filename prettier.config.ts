import type { Config } from 'prettier';

const config: Config = {
    experimentalTernaries: true,
    experimentalOperatorPosition: 'start',
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'as-needed',
    jsxSingleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    objectWrap: 'preserve',
    bracketSameLine: false,
    arrowParens: 'always',
    proseWrap: 'preserve',
    htmlWhitespaceSensitivity: 'css',
    endOfLine: 'lf',
    embeddedLanguageFormatting: 'auto',
    singleAttributePerLine: true,

    plugins: ['prettier-plugin-astro'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],

    astroAllowShorthand: true,
    astroSkipFrontmatter: false,
};

export default config;
