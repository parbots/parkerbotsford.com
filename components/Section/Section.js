import styles from './Section.module.css';

const Section = (props) => {
    return (
        <section
            id={props.id}
            className={`${styles.section} ${props.className}`}
        >
            {props.children}
        </section>
    );
};

export default Section;
