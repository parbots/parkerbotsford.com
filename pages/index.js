import Head from 'next/head';

import styles from 'styles/HomePage.module.css';

import HeroSection from 'components/HeroSection';
import Footer from 'components/Footer';
import AboutSection from 'components/AboutSection';
import ContactSection from 'components/ContactSection';

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
            <AboutSection />
            <ContactSection />
            <Footer />
        </div>
    );
}
