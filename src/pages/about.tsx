
import styles from '@/styles/AboutPage.module.css'

import Head from 'next/head'

import { Header } from '@/components/header'

import { TextLink } from '@/components/textLink'

import { Footer } from '@/components/footer'

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About Me</title>
                <meta name='description' content='Web developer with a passion for designing beautiful and functional user experiences.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>

            <div className={styles.page}>
                <Header title='About Me' />

                <main className={styles.main}>
                    <p className={styles.text}>{'I\'m Parker Botsford, an IT engineer and programmer.'}</p>
                    <p className={styles.text}>{'I currently live near the Atlanta area.'}</p>
                    <p className={styles.text}>{'I enjoy building websites and tools that help software developers and IT technicians work smarter.'}</p>
                    <p className={styles.text}>{'I love working with and maintaing open source projects!'}</p>
                    <p className={styles.text}>
                        {'For more, check out '}
                        <TextLink href='/projects'>my projects</TextLink>
                        {' or '}
                        <TextLink href='/contact'>contact me</TextLink>
                        {'.'}
                    </p>
                </main>

                <Footer />
            </div>
        </>
    );
};
