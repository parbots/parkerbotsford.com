import '@styles/globals.css'

import { Roboto_Mono } from 'next/font/google'

import type { AppProps } from 'next/app'

const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <style jsx global>{`
                html,
                body {
                    font-family: ${robotoMono.style.fontFamily};
                }
            `}</style>

            <Component {...pageProps} />
        </>
    );
};
