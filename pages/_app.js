import 'styles/global.css';

import Head from 'next/head';

import { ThemeProvider } from 'hooks/theme';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                />
                <meta httpEquiv='x-ua-compatible' content='ie=edge' />
                <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='icon/apple-touch-icon.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='icon/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='icon/favicon-16x16.png'
                />
                <link rel='manifest' href='icon/site.webmanifest' />
                <link rel='shortcut icon' href='icon/favicon.ico' />
            </Head>

            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}

export default MyApp;
