
import Head from "next/head";

import styles from "@/styles/AboutPage.module.css"

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About Me</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.page}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{"About Parker Botsford"}</h1>
                </header>

                <main className={styles.main}></main>

                <footer className={styles.footer}>
                    <p className={styles.copyright}>Copyright © 2023 Parker Botsford</p>
                </footer>
            </div>
        </>
    );
}
