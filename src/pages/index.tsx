import Head from 'next/head'
import Link from 'next/link'

import styles from '@styles/HomePage.module.css'

export default function Home() {
    return (
        <>
            <Head>
                <title>Parker Botsford</title>
                <meta name='description' content='Web developer with a passion for designing beautiful and functional user experiences.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div className={styles.page}>
                <main className={styles.main}>
                    <h1 className={styles.title}>{'Hi, I\'m Parker.'}</h1>
                    <p className={styles.description}>{'Web developer with a passion for designing beautiful and functional user experiences.'}</p>
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
