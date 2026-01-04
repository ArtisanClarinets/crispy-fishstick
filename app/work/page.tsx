import { Reveal } from "@/components/reveal";
import { WorkList } from "@/components/work-list";
import { SplitText } from "@/components/react-bits/SplitText";
import { Waves } from "@/components/react-bits/Waves";

export default function WorkPage() {
  return (
    <div className="min-h-screen relative overflow-hidden" data-system-tone="work">
      <div className="absolute inset-0 pointer-events-none z-0">
         <Waves lineColor="rgba(var(--primary-rgb), 0.1)" backgroundColor="transparent" waveSpeedX={0.02} waveSpeedY={0.01} waveAmpX={40} waveAmpY={20} />
      </div>

      <div className="container px-4 md:px-6 py-24 relative z-10">
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
    </div>
  );
}
