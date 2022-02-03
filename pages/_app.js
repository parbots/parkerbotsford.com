import '../styles/global.css';

import Head from 'next/head';

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
                    rel='shortcut icon'
                    href='/favicon.ico'
                    type='image/x-icon'
                />
            </Head>

            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
