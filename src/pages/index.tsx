import styles from '@/styles/HomePage.module.css'

import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
    return (
        <>
            <Head>
                <title>Parker Botsford</title>
                <meta name='description' content='Web developer with a passion for designing beautiful and functional user experiences.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>

            <div className={styles.page}>
                <main className={styles.main}>
                    <h1 className={styles.title}>{'Hi, I\'m Parker.'}</h1>
                    <p className={styles.description}>{'IT engineer and programmer with a passion for designing, building, and maintaining innovative technology solutions.'}</p>
                    <nav className={styles.nav}>
                        <Link href='/about' className={styles.link}>/About</Link>
                        <Link href='/projects' className={styles.link}>/Projects</Link>
                        <Link href='/contact' className={styles.link}>/Contact</Link>
                    </nav>
                </main>
            </div>
        </>
    );
};
