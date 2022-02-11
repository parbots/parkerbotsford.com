import styles from 'styles/BlogHomepage.module.css';

import Head from 'next/head';

import Navbar from 'components/Navbar';

import Typewriter from 'typewriter-effect';

import { gql } from '@apollo/client';
import { contentClient } from 'apollo-client';

export default function BlogHomepage({ posts }) {
    return (
        <div className={styles.page}>
            <Head>
                <title>Parker Botsford</title>
                <meta
                    name='description'
                    content='I post about web development. Mostly React and Next.js, but sometimes other stuff too!'
                />
            </Head>
            <section className={styles.todo}>
                <Navbar
                    links={[
                        {
                            name: 'About',
                            href: '/',
                        },
                        {
                            name: 'Blog',
                            href: '/blog',
                        },
                    ]}
                />
                <h1 className={styles.todoMessage}>
                    <Typewriter
                        options={{ cursor: '｜' }}
                        onInit={(typeWriter) => {
                            typeWriter
                                .pauseFor(500)
                                .typeString('Coming soon...')
                                .start();
                        }}
                    />
                </h1>
                <h1>Posts</h1>
                {posts.map((post) => {
                    return (
                        <div key={post.title}>
                            <h2>{post.title}</h2>
                            <p>{post.published}</p>
                            <p>{post.slug}</p>
                        </div>
                    );
                })}
            </section>
        </div>
    );
}

export async function getStaticProps() {
    const { data } = await contentClient.query({
        query: gql`
            query {
                postCollection {
                    items {
                        title
                        published
                        slug
                    }
                }
            }
        `,
    });

    return {
        props: {
            posts: data.postCollection.items,
        },
    };
}
