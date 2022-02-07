import styles from './InfoBox.module.css';

const InfoBox = (props) => {
    return (
        <div className={`${styles.infoBox} ${props.boxStyle}`}>
            <div className={`${styles.top} ${props.headerStyle}`}>
                <h2 className={styles.title}>{props.title}</h2>
                <p className={styles.hint}>{props.hint}</p>
            </div>
            {props.children}
        </div>
    );
};

export default InfoBox;
