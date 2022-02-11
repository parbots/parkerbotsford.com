import styles from 'styles/Homepage.module.css';

import Head from 'next/head';

import Hero from 'components/Section/Hero';
import About from 'components/Section/About';
import Project from 'components/Section/Project';
import Contact from 'components/Section/Contact';

import { gql } from '@apollo/client';
import { githubClient } from '../apollo-client';

export default function HomePage(props) {
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
            <Project repos={props.repos} />
            <Contact />
        </div>
    );
}

export async function getStaticProps() {
    const { data } = await githubClient.query({
        query: gql`
            query Viewer {
                viewer {
                    pinnedItems(first: 6) {
                        nodes {
                            ... on Repository {
                                name
                                description
                                url
                                repositoryTopics(first: 5) {
                                    nodes {
                                        topic {
                                            name
                                        }
                                    }
                                }
                                languages(first: 3) {
                                    nodes {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `,
    });

    return {
        props: {
            repos: data.viewer.pinnedItems.nodes,
        },
    };
}
