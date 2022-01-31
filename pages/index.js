import Head from 'next/head';

import Header from '../components/header';
import Hero from '../components/hero/';
import Footer from '../components/footer';

import styles from '../styles/about-page.module.css';

export default function HomePage() {
    return (
        <main className={styles.main}>
            <Head>
                <title>Parker Botsford</title>
            </Head>

            <Header />
            <Hero />
            <Footer />
        </main>
    );
}
