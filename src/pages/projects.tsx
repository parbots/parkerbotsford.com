
import Head from 'next/head'
import Link from 'next/link'

import styles from '@styles/ProjectsPage.module.css'

import { Header } from '@components/header'
import { Footer } from '@components/footer'

export default function ProjectsPage() {
    return (
        <>
            <Head>
                <title>Projects</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div className={styles.page}>
                <Header title='Projects' />

                <main className={styles.main}>
                    <p className={styles.text}>{'Some things i\'m working on:'}</p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <p className={styles.text}>
                                <Link href='' className={styles.link}>done</Link>
                                {' - Info about done'}
                            </p>
                        </li>
                        <li className={styles.listItem}>
                            <p className={styles.text}>
                                <Link href='' className={styles.link}>nrc</Link>
                                {' - Info about nrc'}
                            </p>
                        </li>
                    </ul>
                </main>

                <Footer />
            </div>
        </>
    );
};
