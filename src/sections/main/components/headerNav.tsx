"use client";

import Link from "next/link";
import { v4 as uuid } from "uuid";
import { usePathname } from "next/navigation";

export const HeaderNav = ({
    links,
}: {
    links: { name: string; href: string }[];
}) => {
    const currentPathname = usePathname();

    const navItems = links.map((link) => {
        return (
            <li key={uuid()}>
                <Link
                    href={link.href}
                    className={
                        "text-lg hover:underline focus-visible:underline" +
                        (currentPathname == link.href ? " text-purple-500" : "")
                    }
                >
                    {link.name}
                </Link>
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
