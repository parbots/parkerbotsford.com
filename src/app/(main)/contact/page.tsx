import { Metadata } from "next";

export const metadata: Metadata = {
    title: "contact",
    description: "Reach out and let's chat!",
};

export default function ContactPage() {
    return (
        <section className="flex-auto flex justify-center items-center">
            <h1 className="text-7xl">Contact</h1>
        </section>
    );
}
