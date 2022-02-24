import ProjectCard from 'components/ProjectCard';
import styles from './ProjectsSection.module.css';

const ProjectsSection = () => {
    const projects = [
        {
            name: 'Pantry',
            link: 'https://github.com/parbots/pantry-web',
            githubLink: 'https://github.com/parbots/pantry-web',
            description: 'Manage your snippets.',
            madeWith: [
                { name: 'Html' },
                { name: 'CSS' },
                { name: 'Typescript', link: 'https://www.typescriptlang.org/' },
                { name: 'React', link: 'https://reactjs.org/' },
                { name: 'Next.js', link: 'https://nextjs.org/' },
                { name: 'Vercel', link: 'https://vercel.com/home' },
            ],
        },
        {
            name: 'nrc',
            link: 'https://www.npmjs.com/package/@pbots/nrc',
            githubLink: 'https://github.com/parbots/nrc',
            description: 'Create a new react component that fits your needs.',
            madeWith: [
                { name: 'Javascript' },
                { name: 'Node.js', link: 'https://nodejs.org/' },
                { name: 'Npm', link: 'https://www.npmjs.com/' },
                {
                    name: 'Commander.js',
                    link: 'https://github.com/tj/commander.js',
                },
            ],
        },
        {
            name: 'ToDone',
            link: 'https://todone-beta.vercel.app/',
            githubLink: 'https://github.com/parbots/todone',
            description: 'Online task manager.',
            madeWith: [
                { name: 'Html' },
                { name: 'CSS' },
                { name: 'Typescript', link: 'https://www.typescriptlang.org/' },
                { name: 'React', link: 'https://reactjs.org/' },
                { name: 'Next.js', link: 'https://nextjs.org/' },
                { name: 'Vercel', link: 'https://vercel.com/home' },
            ],
        },
    ];

    const projectCards = projects.map((project) => {
        return (
            <ProjectCard
                key={project.name}
                name={project.name}
                link={project.link}
                githubLink={project.githubLink}
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
