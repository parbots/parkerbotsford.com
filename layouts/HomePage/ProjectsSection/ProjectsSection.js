import ProjectCard from 'components/ProjectCard';
import styles from './ProjectsSection.module.css';

import nrcImage from 'public/nrc.svg';
import todoneImage from 'public/todone.png';

const ProjectsSection = () => {
    const projects = [
        {
            image: todoneImage,
            name: 'ToDone',
            link: 'https://todone-parbots.vercel.app/',
            githubLink: 'https://github.com/parbots/todone',
            description:
                'Online todo-list manager using a custom react hook to handle creation, deletion, and sorting of tasks. User data is stored in the browser cache each time a task is updated',
            languages: [
                { name: 'Typescript', link: 'https://www.typescriptlang.org/' },
                { name: 'Html' },
                { name: 'CSS' },
            ],
            tools: [
                { name: 'React', link: 'https://reactjs.org/' },
                { name: 'Next.js', link: 'https://nextjs.org/' },
                { name: 'Vercel', link: 'https://vercel.com/home' },
                { name: 'Firebase', link: 'https://firebase.google.com' },
            ],
        },
        {
            image: nrcImage,
            name: 'nrc',
            link: 'https://www.npmjs.com/package/@pbots/nrc',
            githubLink: 'https://github.com/parbots/nrc',
            description:
                'An npm cli tool for creating react components with some initial boilerplate code. Includes support for Typescript, css-modules, and custom directories.',
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
