import styles from './About.module.css';

import Section from '/components/Section';
import InfoBox from 'components/InfoBox';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCss3Alt,
    faGit,
    faGithubSquare,
    faHtml5,
    faJsSquare,
    faNode,
    faNpm,
    faReact,
} from '@fortawesome/free-brands-svg-icons';

const About = () => {
    const skills = [
        {
            name: 'Javascript',
            icon: <FontAwesomeIcon icon={faJsSquare} size='3x' fixedWidth />,
        },
        {
            name: 'Html',
            icon: <FontAwesomeIcon icon={faHtml5} size='3x' fixedWidth />,
        },
        {
            name: 'Css',
            icon: <FontAwesomeIcon icon={faCss3Alt} size='3x' fixedWidth />,
        },
        {
            name: 'React',
            icon: <FontAwesomeIcon icon={faReact} size='3x' fixedWidth />,
        },
        {
            name: 'Git',
            icon: <FontAwesomeIcon icon={faGit} size='3x' fixedWidth />,
        },
        {
            name: 'GitHub',
            icon: (
                <FontAwesomeIcon icon={faGithubSquare} size='3x' fixedWidth />
            ),
        },
        {
            name: 'Node.js',
            icon: <FontAwesomeIcon icon={faNode} size='3x' fixedWidth />,
        },
        {
            name: 'Npm',
            icon: <FontAwesomeIcon icon={faNpm} size='3x' fixedWidth />,
        },
    ];

    const skillItems = skills.map((skill) => {
        return (
            <li key={skill.name} className={styles.skillItem}>
                {skill.icon}
                <h3 className={styles.skillName}>{skill.name}</h3>
            </li>
        );
    });

    return (
        <Section>
            <InfoBox title='About Me'>
                <div className={styles.aboutMeBox}>
                    <p>
                        I am a coding addict that loves solving problems through
                        programming.
                    </p>
                </div>
            </InfoBox>
            <InfoBox title='Skills'>
                <div className={styles.skillBox}>
                    <ul className={styles.skillList}>{skillItems}</ul>
                </div>
            </InfoBox>
        </Section>
    );
};

export default About;
