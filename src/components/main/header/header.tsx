import styles from "./header.module.css";

export const Header = ({ title }: { title: string }) => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
        </header>
    );
};
