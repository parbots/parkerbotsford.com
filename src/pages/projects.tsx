
import Head from "next/head";

import styles from "@styles/ProjectsPage.module.css"

import { Header } from "@components/header";
import { Footer } from "@components/footer";

export default function ProjectsPage() {
    return (
        <>
            <Head>
                <title>Projects</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.page}>
                <Header title="Projects" />

                <main className={styles.main}></main>

                <Footer />
            </div>
        </>
    );
}
