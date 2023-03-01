
import Head from "next/head";
import Link from "next/link";

import styles from "@styles/AboutPage.module.css"

import { Header } from "@components/header";

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About Me</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.page}>
                <Header title='About Parker Botsford' />

                <main className={styles.main}>
                </main>

                <footer className={styles.footer}>
                    <nav className={styles.nav}>
                        <Link href='/' className={styles.navLink}>/Home</Link>
                        <Link href='/about' className={styles.navLink}>/About</Link>
                        <Link href='/projects' className={styles.navLink}>/Projects</Link>
                        <Link href='/contact' className={styles.navLink}>/Contact</Link>
                    </nav>
                    <p className={styles.copyright}>Copyright © 2023 Parker Botsford</p>
                </footer>
            </div>
        </>
    );
}
