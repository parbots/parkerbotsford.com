import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "projects",
    description: "Check out the cool stuff i've built.",
};

export default function ProjectsPage() {
    return (
        <section className="flex-auto flex justify-center items-center">
            <h1 className="text-7xl">Projects</h1>
        </section>
    );
}
