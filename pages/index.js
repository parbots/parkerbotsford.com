import Head from 'next/head';

import styles from '../styles/HomePage.module.css';

import HeroSection from '../components/HeroSection/HeroSection';
import AboutSection from '../components/AboutSection/AboutSection';
import ProjectSection from '../components/ProjectSection';
import ContactSection from '../components/ContactSection/ContactSection';
import Footer from '../components/Footer';

export default function HomePage() {
    return (
        <div className={styles.page}>
            <Head>
                <title>Parker Botsford</title>
            </Head>

            <HeroSection />
            <AboutSection />
            <ProjectSection />
            <ContactSection />
            <Footer />
        </div>
    );
}
