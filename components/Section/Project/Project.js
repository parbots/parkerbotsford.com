import styles from './Project.module.css';

import Section from '/components/Section';
import InfoBox from 'components/InfoBox';

const Project = (props) => {
    const repos = props.repos.map((repo) => {
        return (
            <li className={styles.repoItem} key={repo.name}>
                <a
                    href={repo.url}
                    className={styles.repoLink}
                    target='_blank'
                    rel='noreferrer'
                >
                    <h3 className={styles.repoName}>{repo.name}</h3>
                    <div className={styles.repoInfoBox}>
                        <p className={styles.repoInfo}>{repo.description}</p>
                    </div>
                </a>
            </li>
        );
    });
    return (
        <Section className={styles.projectSection}>
            <InfoBox title='Projects' hint='(select any project)'>
                <div className={styles.repoBox}>
                    <ul className={styles.repoList}>{repos}</ul>
                </div>
            </InfoBox>
        </Section>
    );
};

export default Project;
