import Head from 'next/head';

import Header from '../components/header';
import Hero from '../components/hero/';
import Footer from '../components/footer';

import styles from '../styles/about-page.module.css';

export default function HomePage() {
    return (
        <div className={styles.main}>
            <Head>
                <title>Parker Botsford</title>
            </Head>

            <Header />
            <main>
                <Hero />
            </main>
            <Footer />
        </div>
    );
}
