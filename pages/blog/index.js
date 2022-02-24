import styles from 'styles/BlogHomepage.module.css';

import Head from 'next/head';
import Link from 'next/link';

import Header from 'components/Header';
import Footer from 'components/Footer';

import { gql } from '@apollo/client';
import { contentClient } from 'apollo-client';

const BlogHomepage = (props) => {
    const formatDate = (published) => {
        return new Date(published).toDateString();
    };

    const posts =
        props.posts.length == 0 ? (
            <p>{`Sorry, I haven't posted yet :(`}</p>
        ) : (
            props.posts.map((post) => {
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
            })
        );

    return (
        <div className={styles.page}>
            <Head>
                <title>Parker Botsford</title>
                <meta
                    name='description'
                    content='I post about web development. Mostly React and Next.js, but sometimes other stuff too!'
                />
            </Head>
            <Header />
            <main className={styles.postsSection}>
                <h1 className={styles.title}>Posts</h1>
                <ul className={styles.postList}>{posts}</ul>
            </main>
            <Footer />
        </div>
    );
};

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

export default BlogHomepage;
