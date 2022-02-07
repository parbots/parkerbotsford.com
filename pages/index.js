import styles from 'styles/HomePage.module.css';

import Head from 'next/head';

import Hero from 'components/Section/Hero';
import About from 'components/Section/About';
import Contact from 'components/Section/Contact';

export default function HomePage() {
    return (
        <div className={styles.page}>
            <Head>
                <title>Parker Botsford</title>
                <meta
                    name='description'
                    content="Hi, my name is Parker. I'm a frontend web developer and I also blog sometimes!"
                />
            </Head>
            <Hero />
            <About />
            <Contact />
        </div>
    );
}
