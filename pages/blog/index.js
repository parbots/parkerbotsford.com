import Head from 'next/head';

import styles from '../../styles/BlogPage.module.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function BlogPage() {
    return (
        <div className={styles.page}>
            <Head>
                <title>Parker Botsford</title>
            </Head>

            <Header />
            <section>
                <h1>Blog Page</h1>
            </section>
            <Footer />
        </div>
    );
}
