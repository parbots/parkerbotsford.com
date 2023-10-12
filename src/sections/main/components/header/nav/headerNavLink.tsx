import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeaderNavLink = ({
    children,
    href,
}: {
    children: React.ReactNode;
    href: string;
}) => {
    const currentPathname = usePathname();

    return (
        <Link
            href={href}
            className={
                "text-lg hover:underline focus-visible:underline " +
                (currentPathname == href ? "text-purple-500" : "")
            }
        >
            {children}
        </Link>
    );
};
