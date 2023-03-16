
import Head from 'next/head'
import Link from 'next/link'

import styles from '@styles/AboutPage.module.css'

import { Header } from '@components/header'
import { Footer } from '@components/footer'

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About Me</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div className={styles.page}>
                <Header title='About Me' />

                <main className={styles.main}>
                    <p className={styles.text}>{'I\'m Parker Botsford, a software engineer.'}</p>
                    <p className={styles.text}>{'I currently live near the Atlanta area.'}</p>
                    <p className={styles.text}>{'I enjoy building websites and tools that help other software developers.'}</p>
                    <p className={styles.text}>{'I love working with and maintaing open source projects!'}</p>
                    <p className={styles.text}>
                        {'For more, check out '}
                        <Link href='/projects' className={styles.link}>my projects</Link>
                        {' or '}
                        <Link href='/contact' className={styles.link}>contact me</Link>
                        {'.'}
                    </p>
                </main>

                <Footer />
            </div>
        </>
    );
};
