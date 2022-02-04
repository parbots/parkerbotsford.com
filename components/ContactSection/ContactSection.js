import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import InfoBox from 'components/InfoBox';

import styles from './ContactSection.module.css';

const ContactSection = () => {
    const links = [
        {
            name: 'GitHub',
            link: 'https://github.com/parkerbotsford',
            icon: <FontAwesomeIcon icon={faGithub} size='3x' fixedWidth />,
        },
        {
            name: 'LinkedIn',
            link: 'https://linkedin.com/in/parkerbotsford',
            icon: <FontAwesomeIcon icon={faLinkedin} size='3x' fixedWidth />,
        },
        {
            name: 'Email',
            link: 'mailto: parker.botsford.dev@gmail.com',
            icon: <FontAwesomeIcon icon={faEnvelope} size='3x' fixedWidth />,
        },
    ];

    const linkComponents = links.map((link) => {
        return (
            <li key={link.name}>
                <a
                    href={link.link}
                    className={styles.link}
                    target='_blank'
                    rel='noreferrer'
                >
                    {link.icon}
                    <p>{link.name}</p>
                </a>
            </li>
        );
    });

    return (
        <section className={styles.contactSection}>
            <InfoBox title='Contact Me'>
                <div className={styles.contactBox}>
                    <ul className={styles.contactList}>{linkComponents}</ul>
                </div>
            </InfoBox>
        </section>
    );
};

export default ContactSection;