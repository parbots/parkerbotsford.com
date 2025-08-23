import styles from './Link.module.css';

interface Props {
    text: string;
    href: string;
}

const Link = (props: Props) => {
    return (
        <a
            href={props.href}
            className={styles.link}
        >
            {props.text}
        </a>
    );
};

export default Link;
