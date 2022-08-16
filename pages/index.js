import styles from 'styles/Homepage.module.css';

import Head from 'next/head';

import Header from 'components/Header';
import IntroSection from 'layouts/HomePage/IntroSection';
import AboutSection from 'layouts/HomePage/AboutSection';
import ProjectsSection from 'layouts/HomePage/ProjectsSection';
import ContactSection from 'layouts/HomePage/ContactSection';
import Footer from 'components/Footer';

const HomePage = () => {
    return (
        <div className={styles.page}>
            <Head>
                <title>Parker Botsford</title>
                <meta
                    name='description'
                    content="Hi, my name is Parker. I'm a fullstack web developer and I also blog sometimes!"
                />
            </Head>

            <Header />
            <main>
                <IntroSection />
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
