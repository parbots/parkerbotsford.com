import styles from './Header.module.css';

import Image from 'next/image';
import icon from '/public/icon/android-chrome-512x512.png';

const Header = () => {
    return (
        <header className={styles.header}>
            <Image
                className={styles.icon}
                src={icon}
                alt='pb icon'
                width='64'
                height='64'
                priority
            />
        </header>
    );
};

export default Header;
