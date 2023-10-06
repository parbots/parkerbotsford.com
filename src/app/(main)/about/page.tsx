import { Metadata } from "next";

export const metadata: Metadata = {
    title: "about",
    description: "Learn a little bit about me.",
};

export default function AboutPage() {
    return (
        <section className="flex-auto flex justify-center items-center">
            <h1 className="text-7xl">About</h1>
        </section>
    );
}
