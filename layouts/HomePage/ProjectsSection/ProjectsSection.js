import ProjectCard from 'components/ProjectCard';
import styles from './ProjectsSection.module.css';

import nrcImage from 'public/nrc.svg';
import todoneImage from 'public/todone.png';

const ProjectsSection = () => {
    const projects = [
        {
            image: todoneImage,
            name: 'ToDone',
            link: 'https://todone-beta.vercel.app/',
            githubLink: 'https://github.com/parbots/todone',
            description: 'Online task manager.',
            languages: [
                { name: 'Typescript', link: 'https://www.typescriptlang.org/' },
                { name: 'Html' },
                { name: 'CSS' },
            ],
            tools: [
                { name: 'React', link: 'https://reactjs.org/' },
                { name: 'Next.js', link: 'https://nextjs.org/' },
                { name: 'Vercel', link: 'https://vercel.com/home' },
            ],
        },
        {
            image: nrcImage,
            name: 'nrc',
            link: 'https://www.npmjs.com/package/@pbots/nrc',
            githubLink: 'https://github.com/parbots/nrc',
            description: 'Create a new react component that fits your needs.',
            languages: [
                { name: 'Typescript', link: 'https://www.typescriptlang.org/' },
            ],
            tools: [
                { name: 'Node.js', link: 'https://nodejs.org/' },
                { name: 'Npm', link: 'https://www.npmjs.com/' },
                {
                    name: 'Commander.js',
                    link: 'https://github.com/tj/commander.js',
                },
            ],
        },
    ];

    const projectCards = projects.map((project) => {
        return (
            <ProjectCard
                key={project.name}
                image={project.image}
                name={project.name}
                link={project.link}
                githubLink={project.githubLink}
                description={project.description}
                languages={project.languages}
                tools={project.tools}
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
