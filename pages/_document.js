import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html lang='en'>
            <Head>
                <link
                    rel='preload'
                    href='/fonts/RobotoMono/RobotoMonoVariable-Regular.ttf'
                    as='font'
                    crossOrigin=''
                />
                <link
                    rel=''
                    href='/fonts/RobotoMono/RobotoMonoVariable-Italic.ttf'
                    as='font'
                    crossOrigin=''
                />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
