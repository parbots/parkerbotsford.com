import styles from './SkillList.module.css';

import SkillItem from './SkillItem';

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

const SkillList = () => {
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
            <SkillItem key={skill.name} name={skill.name}>
                {skill.icon}
            </SkillItem>
        );
    });

    return <ul className={styles.skillList}>{skillItems}</ul>;
};

export default SkillList;
