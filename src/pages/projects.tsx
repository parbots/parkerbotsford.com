
import Head from 'next/head'

import styles from '@styles/ProjectsPage.module.css'

import { Header } from '@components/header'
import { Footer } from '@components/footer'

export default function ProjectsPage() {
    return (
        <>
            <Head>
                <title>Projects</title>
                <meta name='description' content='Web developer with a passion for designing beautiful and functional user experiences.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>

            <div className={styles.page}>
                <Header title='Projects' />

                <main className={styles.main}>
                    <p className={styles.text}>{'Some things i\'m working on:'}</p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <p className={styles.text}>
                                {'parkerbotsford.com ('}
                                <a href='https://github.com/parbots/parkerbotsford.com' target='_blank' rel='noreferrer' className={styles.link}>Github</a>
                                {') - This website! Built with '}
                                <a href='https://nextjs.org/' target='_blank' rel='noreferrer' className={styles.link}>Next.js</a>
                                {' and lots of love.'}
                            </p>
                        </li>
                        <li className={styles.listItem}>
                            <p className={styles.text}>
                                <a href='https://get-stuff-done.vercel.app' target='_blank' rel='noreferrer' className={styles.link}>done</a>
                                {' ('}
                                <a href='https://github.com/parbots/done' target='_blank' rel='noreferrer' className={styles.link}>Github</a>
                                {') - Online todo manager. Uses '}
                                <a href='https://nextjs.org/' target='_blank' rel='noreferrer' className={styles.link}>Next.js</a>
                                {' on the frontend and '}
                                <a href='https://supabase.com/' target='_blank' rel='noreferrer' className={styles.link}>Supabase</a>
                                {' for the database on the backend.'}
                            </p>
                        </li>
                        <li className={styles.listItem}>
                            <p className={styles.text}>
                                <a href='https://www.npmjs.com/package/@pbots/nrc' target='_blank' rel='noreferrer' className={styles.link}>nrc</a>
                                {' ('}
                                <a href='https://github.com/parbots/nrc' target='_blank' rel='noreferrer' className={styles.link}>Github</a>
                                {') - CLI for creating React functional components. Built with '}
                                <a href='https://www.npmjs.com/package/commander' target='_blank' rel='noreferrer' className={styles.link}>Commander.js</a>
                                {' and '}
                                <a href='https://nodejs.org/' target='_blank' rel='noreferrer' className={styles.link}>Node.js</a>
                                {'.'}
                            </p>
                        </li>
                    </ul>
                </main>

                <Footer />
            </div>
        </>
    );
};
