
import styles from './TextLink.module.css'

import Link from 'next/link'

import { ReactNode } from 'react'

type TextLinkProps = {
    href: string,
    out?: boolean,
    children: ReactNode,
};

export const TextLink = ({ href, children, out = false }: TextLinkProps) => {

    if (out) {
        return (
            <a href={href} target='_blank' rel='noreferrer' className={styles.link}>{children}</a>
        );
    }

    return (
        <Link href={href} className={styles.link}>{children}</Link>
    );
};
