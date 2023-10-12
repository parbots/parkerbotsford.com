import { HeaderNav } from "./nav/headerNav";
import { ThemeToggle } from "@components/themeToggle";

export const Header = ({ title }: { title: string }) => {
    const links = [
        {
            name: "home",
            href: "/",
        },
        {
            name: "about",
            href: "/about",
        },
        {
            name: "projects",
            href: "/projects",
        },
        {
            name: "contact",
            href: "/contact",
        },
    ];

    return (
        <header className="w-screen max-h-[10vh] flex flex-row justify-center items-center px-40 py-4">
            <section className="flex-auto flex flex-row justify-start items-center">
                <h2 className="text-5xl">{title}</h2>
            </section>
            <section className="flex-auto flex flex-row justify-center items-center gap-4">
                <HeaderNav links={links} />
                <ThemeToggle />
            </section>
        </header>
    );
};
