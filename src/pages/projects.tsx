
import styles from '@/styles/ProjectsPage.module.css'

import Head from 'next/head'

import { Header } from '@/components/header'

import { TextLink } from '@/components/textLink'

import { Footer } from '@/components/footer'

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
                                <TextLink href='https://github.com/parbots/parkerbotsford.com' out={true}>Github</TextLink>
                                {') - This website! Built with '}
                                <TextLink href='https://nextjs.org/' out={true}>Next.js</TextLink>
                                {' and lots of love. Hosted on '}
                                <TextLink href='https://vercel.org/' out={true}>Vercel</TextLink>
                                {'.'}
                            </p>
                        </li>
                        <li className={styles.listItem}>
                            <p className={styles.text}>
                                <TextLink href='https://get-stuff-done.vercel.app' out={true}>done</TextLink>
                                {' ('}
                                <TextLink href='https://github.com/parbots/done' out={true}>Github</TextLink>
                                {') - Online todo manager. Uses '}
                                <TextLink href='https://nextjs.org/' out={true}>Next.js</TextLink>
                                {' on the frontend and '}
                                <TextLink href='https://supabase.com/' out={true}>Supabase</TextLink>
                                {' for the database on the backend. Hosted on '}
                                <TextLink href='https://vercel.org/' out={true}>Vercel</TextLink>
                                {'.'}
                            </p>
                        </li>
                        <li className={styles.listItem}>
                            <p className={styles.text}>
                                <TextLink href='https://www.npmjs.com/package/@pbots/nrc' out={true}>nrc</TextLink>
                                {' ('}
                                <TextLink href='https://github.com/parbots/nrc' out={true}>Github</TextLink>
                                {') - CLI for creating React functional components. Built with '}
                                <TextLink href='https://www.npmjs.com/package/commander' out={true}>Commander.js</TextLink>
                                {' and '}
                                <TextLink href='https://nodejs.org/' out={true}>Node.js</TextLink>
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
