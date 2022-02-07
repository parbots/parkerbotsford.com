import styles from './Contact.module.css';

import Section from '/components/Section';
import InfoBox from 'components/InfoBox';
import Footer from 'components/Footer';

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Contact = () => {
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
        <Section id='contactSection' className={styles.contactSection}>
            <InfoBox
                title='Contact Me'
                boxStyle={styles.contactBox}
                headerStyle={styles.contactBoxTop}
            >
                <ul className={styles.contactList}>{linkComponents}</ul>
            </InfoBox>
            <Footer />
        </Section>
    );
};

export default Contact;
