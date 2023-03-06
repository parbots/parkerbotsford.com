
import Head from 'next/head'

import styles from '@styles/ContactPage.module.css'

import { Header } from '@components/header'
import { Footer } from '@components/footer'

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact Me</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div className={styles.page}>
                <Header title='Contact' />

                <main className={styles.main}></main>

                <Footer />
            </div>
        </>
    );
};
