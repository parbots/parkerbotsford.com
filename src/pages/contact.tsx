
import Head from 'next/head'

import styles from '@styles/ContactPage.module.css'

import { Header } from '@components/header'
import { Footer } from '@components/footer'

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact Me</title>
                <meta name='description' content='Web developer with a passion for designing beautiful and functional user experiences.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>

            <div className={styles.page}>
                <Header title='Contact' />

                <main className={styles.main}>
                    <p className={styles.text}>
                        {'You probably want to email me at '}
                        <a href='mailto: parker.botsford.dev@gmail.com' target='_blank' rel='noreferrer' className={styles.link}>parker.botsford.dev@gmail.com</a>
                        {', but you can also find me elsewhere online:'}
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <a href='https://github.com/parbots' target='_blank' rel='noreferrer' className={styles.link}>Github</a>
                        </li>
                        <li className={styles.listItem}>
                            <a href='https://www.linkedin.com/in/parkerbotsford' target='_blank' rel='noreferrer' className={styles.link}>LinkedIn</a>
                        </li>
                    </ul>
                </main>

                <Footer />
            </div>
        </>
    );
};
