import styles from 'styles/BlogPost.module.css';

import Head from 'next/head';

import Header from 'components/Header';
import Footer from 'components/Footer';

import { gql } from '@apollo/client';
import { contentClient } from 'apollo-client';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Post = ({ post }) => {
    return (
        <div className={styles.page}>
            <Head>
                <title>{post.title}</title>
                <meta
                    name='description'
                    content='I post about web development. Mostly React and Next.js, but sometimes other stuff too!'
                />
            </Head>
            <Header />
            <main className={styles.postsSection}>
                <h1>{post.title}</h1>
                {documentToReactComponents(post.content.json)}
            </main>
            <Footer />
        </div>
    );
};

export async function getStaticProps({ params }) {
    const { data } = await contentClient.query({
        query: gql`
            query {
                postCollection(where: {slug: "${params.slug}"}) {
                    items {
                        title
                        published
                        slug
                        content {
                            json
                        }
                    }
                }
            }
        `,
    });

    return {
        props: {
            post: data.postCollection.items[0],
        },
    };
}

export async function getStaticPaths() {
    const { data } = await contentClient.query({
        query: gql`
            query {
                postCollection {
                    items {
                        slug
                    }
                }
            }
        `,
    });

    const posts = data.postCollection.items;

    return {
        paths: posts.map(({ slug }) => `/blog/${slug}`),
        fallback: false,
    };
}

export default Post;
