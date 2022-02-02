import styles from './SkillsList.module.css';

const SkillsList = (props) => {
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
            <button
                onClick={() =>
                    props.setInfo({
                        title: skill.title,
                        text: skill.text,
                    })
                }
            >
                {skill.title}
            </button>
        </li>
    ));

    return <ul className={styles.skillsList}>{skillsList}</ul>;
};

export default SkillsList;
