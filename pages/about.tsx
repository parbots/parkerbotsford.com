
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
            </div>
        </>
    );
}
