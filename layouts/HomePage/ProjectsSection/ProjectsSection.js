import ProjectCard from 'components/ProjectCard';
import styles from './ProjectsSection.module.css';

const ProjectsSection = () => {
    const projects = [
        {
            name: 'Pantry',
            link: 'https://github.com/parbots/pantry-web',
            description: 'Manage your snippets.',
            madeWith: [
                { name: 'Html' },
                { name: 'Css' },
                { name: 'Typescript' },
            ],
        },
        {
            name: 'nrc',
            link: 'https://www.npmjs.com/package/@pbots/nrc',
            description: 'Create a new react component that fits your needs.',
            madeWith: [
                { name: 'Html' },
                { name: 'Css' },
                { name: 'Typescript' },
            ],
        },
        {
            name: 'ToDone',
            link: 'https://todone-beta.vercel.app/',
            description: 'Online task manager.',
            madeWith: [
                { name: 'Html' },
                { name: 'Css' },
                { name: 'Typescript' },
            ],
        },
    ];

    const projectCards = projects.map((project) => {
        return (
            <ProjectCard
                key={project.name}
                name={project.name}
                link={project.link}
                description={project.description}
                madeWith={project.madeWith}
            />
        );
    });

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h2 className={styles.headerTitle}>Projects</h2>
            </header>
            <section className={styles.content}>{projectCards}</section>
        </section>
    );
};

export default ProjectsSection;
