import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Parker Botsford",
    description: "Software developer and IT engineer.",
};

export default function HomePage() {
    return (
        <section className="flex-auto flex justify-center items-center">
            <h1 className="text-7xl">Parker Botsford</h1>
        </section>
    );
}
