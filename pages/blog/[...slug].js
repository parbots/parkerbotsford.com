import styles from 'styles/BlogPostPage.module.css';

import Head from 'next/head';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { useRouter } from 'next/router';

const BlogPostPage = () => {
    const router = useRouter();

    return (
        <div className={styles.page}>
            <Head>
                <title>A Blog Post</title>
                <meta
                    name='description'
                    content='I post about web development. Mostly React and Next.js, but sometimes other stuff too!'
                />
            </Head>
            <Header blog />
            <main className={styles.postsSection}>
                <h1>Post</h1>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPostPage;
