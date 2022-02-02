import styles from './InfoBox.module.css';

const InfoBox = (props) => {
    return (
        <div className={styles.infoBox}>
            <h2 className={styles.title}>{props.title}</h2>
            <p className={styles.text}>{props.text}</p>
        </div>
    );
};

export default InfoBox;
