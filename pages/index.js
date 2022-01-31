import Head from 'next/head';

import Header from '../components/header';
import Hero from '../components/hero/';
import Footer from '../components/footer';

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Parker Botsford</title>
            </Head>

            <Header />
            <Hero />
            <Footer />
        </div>
    );
}
