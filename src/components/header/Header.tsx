
import styles from './Header.module.css'

type HeaderProps = {
    title: string;
};

export const Header = ({title}: HeaderProps) => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
        </header>
    );
};
