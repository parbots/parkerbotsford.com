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
            name: 'Html',
            icon: <FontAwesomeIcon icon={faHtml5} size='3x' fixedWidth />,
        },
        {
            name: 'Css',
            icon: <FontAwesomeIcon icon={faCss3Alt} size='3x' fixedWidth />,
        },
        {
            name: 'JavaScript',
            icon: <FontAwesomeIcon icon={faJsSquare} size='3x' fixedWidth />,
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
                <h4 className={styles.skillName}>{skill.name}</h4>
            </li>
        );
    });

    return (
        <Section>
            <div className={styles.aboutContainer}>
                <InfoBox title='About Me'>
                    <div className={styles.aboutMeBox}>
                        <p>
                            {`I love coding and creating tools for other
                            developers.`}
                            <br />
                            {`(Check them out on my `}
                            <a
                                href='https://github.com/parkerbotsford'
                                target='_blank'
                                rel='noreferrer'
                                className={styles.link}
                            >
                                Github
                            </a>
                            {`!)`}
                        </p>
                        <p>
                            {`I'm currently using Typescript, React, and Next.js.`}
                        </p>
                        <p>
                            {`Some fun facts about me:`}
                            <ul className={styles.factList}>
                                <li>
                                    {`I'm obssessed with the `}
                                    <a
                                        href='https://github.com/morhetz/gruvbox'
                                        target='_blank'
                                        rel='noreferrer'
                                        className={styles.link}
                                    >
                                        Gruvbox
                                    </a>
                                    {` colorscheme.`}
                                </li>
                                <li>I enjoy skateboarding.</li>
                                <li>I drink 2 cups of coffee a day.</li>
                            </ul>
                        </p>
                    </div>
                </InfoBox>
                <InfoBox title='Skills'>
                    <div className={styles.skillBox}>
                        <ul className={styles.skillList}>{skillItems}</ul>
                    </div>
                </InfoBox>
            </div>
        </Section>
    );
};

export default About;
