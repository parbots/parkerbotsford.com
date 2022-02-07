import styles from 'styles/BlogHomepage.module.css';

import Head from 'next/head';

import Navbar from 'components/Navbar';

import Typewriter from 'typewriter-effect';

export default function BlogHomepage() {
    return (
        <div className={styles.page}>
            <Head>
                <title>Parker Botsford</title>
                <meta
                    name='description'
                    content='I post about web development. Mostly React and Next.js, but sometimes other stuff too!'
                />
            </Head>
            <section className={styles.todo}>
                <Navbar
                    links={[
                        {
                            name: 'About',
                            href: '/',
                        },
                        {
                            name: 'Blog',
                            href: '/blog',
                        },
                    ]}
                />
                <h1 className={styles.todoMessage}>
                    <Typewriter
                        options={{ cursor: '｜' }}
                        onInit={(typeWriter) => {
                            typeWriter
                                .pauseFor(500)
                                .typeString('Coming soon...')
                                .start();
                        }}
                    />
                </h1>
            </section>
        </div>
    );
}
