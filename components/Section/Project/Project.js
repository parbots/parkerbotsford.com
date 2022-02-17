import styles from './Project.module.css';

import Section from '/components/Section';
import InfoBox from 'components/InfoBox';

const Project = ({ repos }) => {
    const repoItems = repos.map((repo) => {
        return (
            <li className={styles.repoItem} key={repo.name}>
                <div className={styles.repoTop}>
                    <h3 className={styles.repoName}>{repo.name}</h3>
                    <a
                        href={repo.url}
                        target='_blank'
                        rel='noreferrer'
                        className={styles.repoLink}
                    >
                        View on Github
                    </a>
                </div>
                <div className={styles.repoInfoBox}>
                    <p className={styles.repoInfo}>{repo.description}</p>
                </div>
                <ul className={styles.repoTagList}>
                    {repo.repositoryTopics.nodes.map((topic) => {
                        return (
                            <li
                                key={topic.topic.name}
                                className={styles.repoTag}
                            >
                                {topic.topic.name}
                            </li>
                        );
                    })}
                    {repo.languages.nodes.map((language) => {
                        return (
                            <li key={language.name} className={styles.repoTag}>
                                {language.name}
                            </li>
                        );
                    })}
                </ul>
            </li>
        );
    });

    return (
        <Section>
            <InfoBox title='Projects'>
                <div className={styles.repoBox}>
                    <ul className={styles.repoList}>{repoItems}</ul>
                </div>
            </InfoBox>
        </Section>
    );
};

export default Project;
