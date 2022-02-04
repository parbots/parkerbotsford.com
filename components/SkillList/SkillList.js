import styles from './SkillList.module.css';

import SkillItem from './SkillItem';

const SkillList = () => {
    return (
        <ul className={styles.skillList}>
            <SkillItem>React</SkillItem>
        </ul>
    );
};

export default SkillList;
