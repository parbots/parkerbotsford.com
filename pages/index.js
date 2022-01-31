import Head from 'next/head';

const title = "Hi, i'm Parker Botsford.";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Parker Botsford</title>
            </Head>

            <header>
                <h2>Parker Botsford</h2>
                <nav>
                    <a href=''>Blog</a>
                    <a href=''>About</a>
                    <a href=''>Contact</a>
                </nav>
            </header>

            <main>
                <h1>{title}</h1>
            </main>

            <footer>
                <p>© Parker Botsford 2022</p>
            </footer>
        </div>
    );
}
