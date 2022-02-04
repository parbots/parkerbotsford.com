import styles from './SkillItem.module.css';

const SkillItem = (props) => {
    return (
        <li className={styles.item}>
            <button className={styles.button}>{props.children}</button>
        </li>
    );
};

export default SkillItem;
