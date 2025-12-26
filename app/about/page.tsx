import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
    title: "About",
    description: "About Dylan Thompson and the studio."
}

export default function AboutPage() {
    return (
        <div className="container py-24 px-4 max-w-3xl">
             <h1 className="text-4xl font-bold tracking-tight mb-8">About</h1>

             <div className="prose prose-neutral dark:prose-invert lg:prose-lg mb-12">
                <p className="lead">
                    I am a software engineer and designer specializing in high-performance web applications.
                    I help founders and companies build products that feel &quot;expensive&quot; — reliable, fast, and meticulously crafted.
                </p>

                <p>
                    With a background in both systems engineering and UI design, I bridge the gap that often exists between &quot;it works&quot; and &quot;it feels right.&quot;
                    I don&apos;t just hand off code; I take ownership of the outcome.
                </p>

                <h3>My Philosophy</h3>
                <p>
                    Software should be treated with the same level of craftsmanship as a physical product.
                    Loose alignment, janky transitions, and slow loading times are the digital equivalent of creaky floorboards.
                    I build houses that don&apos;t creak.
                </p>

                <h3>Why Work With Me?</h3>
                <ul>
                    <li><strong>No Middleman:</strong> You work directly with the person writing the code.</li>
                    <li><strong>Production Grade:</strong> I include CI/CD, tests, and monitoring in every project.</li>
                    <li><strong>Design Sensibility:</strong> I can execute on high-fidelity designs or help you refine them.</li>
                </ul>
             </div>

             <Button asChild size="lg">
                <Link href="/contact">Let&apos;s work together</Link>
             </Button>
        </div>
    )
}
