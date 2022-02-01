import Head from 'next/head';

import styles from '../styles/HomePage.module.css';

import HeroSection from '../components/HeroSection/HeroSection';
import Footer from '../components/Footer';

export default function HomePage() {
    return (
        <div className={styles.page}>
            <Head>
                <title>Parker Botsford</title>
                <meta
                    name='description'
                    content='Fullstack web developer and I also blog sometimes!'
                />
            </Head>

            <HeroSection />
            <Footer />
        </div>
    );
}
