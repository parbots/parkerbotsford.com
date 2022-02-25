import styles from 'styles/BlogHomepage.module.css';

import Head from 'next/head';

import { useState } from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';

const BlogHomepage = () => {
    const [hasPosts] = useState(false);

    return (
        <div className={styles.page}>
            <Head>
                <title>Parker Botsford</title>
                <meta
                    name='description'
                    content='I post about web development. Mostly React and Next.js, but sometimes other stuff too!'
                />
            </Head>
            <Header blog />
            <main className={styles.postsSection}>
                <h1 className={styles.title}>Posts</h1>
                {!hasPosts && <p>{'Sorry, no posts yet :('}</p>}
                {hasPosts && <ul className={styles.postList}></ul>}
            </main>
            <Footer />
        </div>
    );
};

export default BlogHomepage;
