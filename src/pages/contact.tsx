
import Head from 'next/head'
import Link from 'next/link'

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

                <main className={styles.main}>
                    <p className={styles.text}>
                        {'You probably want to '}
                        <Link href='' className={styles.link}>email me at parker.botsford.dev@gmail.com</Link>
                        {', but you can also find me elsewhere online:'}
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <Link href='' className={styles.link}>Github</Link>
                        </li>
                        <li className={styles.listItem}>
                            <Link href='' className={styles.link}>LinkedIn</Link>
                        </li>
                    </ul>
                </main>

                <Footer />
            </div>
        </>
    );
};
