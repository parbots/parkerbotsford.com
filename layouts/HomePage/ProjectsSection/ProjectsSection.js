import ProjectCard from 'components/ProjectCard';
import styles from './ProjectsSection.module.css';

const ProjectsSection = () => {
    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h2 className={styles.headerTitle}>Projects</h2>
            </header>
            <section className={styles.content}>
                <ProjectCard
                    name='Pantry'
                    link='https://github.com/parbots/pantry-web'
                    description='All your ingredients, in one place.'
                    madeWith={[
                        { name: 'Typescript' },
                        { name: 'React', link: 'https://reactjs.org/' },
                    ]}
                />
            </section>
        </section>
    );
};

export default ProjectsSection;
