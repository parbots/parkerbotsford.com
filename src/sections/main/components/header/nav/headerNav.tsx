"use client";

import { v4 as uuid } from "uuid";
import { HeaderNavLink } from "./headerNavLink";

export const HeaderNav = ({
    links,
}: {
    links: { name: string; href: string }[];
}) => {
    const navItems = links.map((link) => {
        return (
            <li key={uuid()}>
                <HeaderNavLink href={link.href}>{link.name}</HeaderNavLink>
            </li>
        );
    });

    return (
        <nav className="flex-auto flex flex-row justify-center items-center">
            <ul className="flex-auto flex flex-row justify-center items-center gap-4">
                {navItems}
            </ul>
        </nav>
    );
};
