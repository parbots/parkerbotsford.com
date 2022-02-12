import styles from 'styles/BlogHomepage.module.css';

import Head from 'next/head';

import Navbar from 'components/Navbar';

import { gql } from '@apollo/client';
import { contentClient } from 'apollo-client';
import Link from 'next/link';

export default function BlogHomepage({ posts }) {
    const formatDate = (published) => {
        return new Date(published).toDateString();
    };

    return (
        <div className={styles.page}>
            <Head>
                <title>Parker Botsford</title>
                <meta
                    name='description'
                    content='I post about web development. Mostly React and Next.js, but sometimes other stuff too!'
                />
            </Head>
            <section className={styles.postsSection}>
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

                <h1 className={styles.title}>Posts</h1>

                <ul className={styles.postList}>
                    {posts.map((post) => {
                        return (
                            <li key={post.title}>
                                <Link href={`/blog/${post.slug}`}>
                                    <a className={styles.postLink}>
                                        <div className={styles.postTop}>
                                            <h2 className={styles.postTitle}>
                                                {post.title}
                                            </h2>
                                            <p className={styles.postDate}>
                                                {formatDate(post.published)}
                                            </p>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
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
