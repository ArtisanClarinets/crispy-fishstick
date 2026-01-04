import { Reveal } from "@/components/reveal";
import { WorkList } from "@/components/work-list";
import { SplitText } from "@/components/react-bits/SplitText";

export default function WorkPage() {
  return (
    <div className="min-h-screen py-24 container px-4 md:px-6" data-system-tone="work">
      <div className="max-w-2xl mb-16 md:mb-24">
        <Reveal>
          <SplitText
            text="Selected Work"
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            delay={0.1}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A collection of technical deep dives. I specialize in complex, data-heavy applications where performance and reliability are non-negotiable.
          </p>
        </Reveal>
      </div>

      <WorkList />
    </div>
  );
}
