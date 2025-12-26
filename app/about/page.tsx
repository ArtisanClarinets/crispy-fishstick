import type { Metadata } from "next";
import { SkillCategories } from "@/components/skill-bars";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about our studio and what drives us.",
};

const skillCategories = [
  {
    name: "Frontend Development",
    skills: [
      { name: "React & Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    name: "Backend & Integration",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "GraphQL", level: 85 },
      { name: "REST APIs", level: 92 },
      { name: "Database Design", level: 80 },
    ],
  },
  {
    name: "Design",
    skills: [
      { name: "UI/UX Design", level: 90 },
      { name: "Design Systems", level: 88 },
      { name: "Prototyping", level: 85 },
      { name: "User Research", level: 78 },
    ],
  },
  {
    name: "Tools & Workflow",
    skills: [
      { name: "Git & GitHub", level: 92 },
      { name: "CI/CD", level: 85 },
      { name: "Testing", level: 82 },
      { name: "Performance Optimization", level: 88 },
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Studio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            We're a digital studio dedicated to creating exceptional web
            experiences that make a difference.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded with a passion for crafting beautiful and functional
                digital experiences, Studio has grown from a solo endeavor into
                a creative powerhouse.
              </p>
              <p>
                We believe that great design and development go hand in hand.
                Every project we undertake is an opportunity to push boundaries
                and create something truly exceptional.
              </p>
              <p>
                Our approach combines strategic thinking, creative design, and
                technical excellence to deliver solutions that not only look
                great but perform exceptionally well.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Quality First
                </h3>
                <p className="text-muted-foreground">
                  We never compromise on quality. Every line of code, every
                  pixel, every interaction is crafted with care.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Continuous Learning
                </h3>
                <p className="text-muted-foreground">
                  Technology evolves rapidly, and so do we. We're constantly
                  learning and adopting the best tools and practices.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Client Partnership
                </h3>
                <p className="text-muted-foreground">
                  We work closely with our clients as true partners,
                  understanding their goals and exceeding expectations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've honed our skills across a wide range of technologies and
              disciplines to deliver comprehensive solutions.
            </p>
          </div>

          <SkillCategories categories={skillCategories} />
        </div>

        {/* CTA */}
        <div className="text-center bg-secondary/50 rounded-2xl p-12 border border-border">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear about it and discuss how
            we can help bring your vision to life.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
