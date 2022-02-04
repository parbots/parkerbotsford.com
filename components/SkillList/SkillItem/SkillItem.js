import styles from './SkillItem.module.css';

const SkillItem = (props) => {
    return (
        <li className={styles.item}>
            {props.children}
            <h3 className={styles.name}>{props.name}</h3>
        </li>
    );
};

export default SkillItem;
