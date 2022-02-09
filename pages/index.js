import styles from 'styles/Homepage.module.css';

import Head from 'next/head';

import Hero from 'components/Section/Hero';
import About from 'components/Section/About';
import Project from 'components/Section/Project';
import Contact from 'components/Section/Contact';

import { gql } from '@apollo/client';
import client from '../apollo-client';

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
    const { data } = await client.query({
        query: gql`
            query Viewer {
                viewer {
                    repositories(first: 6) {
                        nodes {
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
                            languages(first: 5) {
                                nodes {
                                    name
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
            repos: data.viewer.repositories.nodes,
        },
    };
}
