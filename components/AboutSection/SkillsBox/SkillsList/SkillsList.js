import styles from './SkillsList.module.css';

const SkillsList = () => {
    const skills = [
        {
            title: 'React',
            text: 'React is a javascript framework for designing beautiful web apps.',
        },
        {
            title: 'Git',
            text: 'Git is a version control system.',
        },
        {
            title: 'Next.js',
            text: 'Next.js is a react framework for building fast webpages.',
        },
    ];

    const skillsList = skills.map((skill) => (
        <li key={skill.title} className={styles.skill}>
            {skill.title}
        </li>
    ));

    return <ul className={styles.skillsList}>{skillsList}</ul>;
};

export default SkillsList;
