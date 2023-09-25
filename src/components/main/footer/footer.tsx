import styles from "./footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                Copyright © 2023 Parker Botsford
            </p>
        </footer>
    );
};
