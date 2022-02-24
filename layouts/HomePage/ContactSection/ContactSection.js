import styles from './ContactSection.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const ContactSection = () => {
    // TODO: Add a resume link
    const links = [
        {
            name: 'GitHub',
            href: 'https://github.com/parkerbotsford',
            icon: faGithub,
        },
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com/in/parkerbotsford',
            icon: faLinkedin,
        },
        {
            name: 'Email',
            href: 'mailto: parker.botsford.dev@gmail.com',
            icon: faEnvelope,
        },
    ];

    const linkItems = links.map((link) => {
        return (
            <li key={link.name}>
                <a
                    href={link.href}
                    target='_blank'
                    rel='noreferrer'
                    className={styles.link}
                >
                    <FontAwesomeIcon
                        icon={link.icon}
                        fixedWidth
                        className={styles.linkIcon}
                    />
                    <div className={styles.linkNameContainer}>
                        <p className={styles.linkName}>{link.name}</p>
                    </div>
                </a>
            </li>
        );
    });

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>Contact Me</h1>
            </header>
            <section className={styles.content}>
                <ul className={styles.linkList}>{linkItems}</ul>
            </section>
        </section>
    );
};

export default ContactSection;
