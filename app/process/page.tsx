import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Process",
  description: "Our proven process for delivering exceptional digital products.",
};

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your goals, challenges, and target audience. Through research and analysis, we define the project scope and success criteria.",
    deliverables: [
      "Project brief",
      "User research",
      "Competitive analysis",
      "Technical requirements",
    ],
  },
  {
    number: "02",
    title: "Strategy & Planning",
    description:
      "Based on our findings, we develop a comprehensive strategy and roadmap. We define the architecture, technology stack, and timeline.",
    deliverables: [
      "Project roadmap",
      "Technical architecture",
      "Content strategy",
      "Resource planning",
    ],
  },
  {
    number: "03",
    title: "Design",
    description:
      "We create wireframes, prototypes, and high-fidelity designs that bring the vision to life. Every element is crafted with purpose and attention to detail.",
    deliverables: [
      "Wireframes",
      "Interactive prototypes",
      "Visual designs",
      "Design system",
    ],
  },
  {
    number: "04",
    title: "Development",
    description:
      "Our team builds your product using modern technologies and best practices. We focus on performance, scalability, and maintainability.",
    deliverables: [
      "Clean, documented code",
      "Responsive implementation",
      "API integration",
      "Quality assurance",
    ],
  },
  {
    number: "05",
    title: "Testing & Refinement",
    description:
      "Rigorous testing ensures everything works flawlessly across devices and browsers. We refine based on feedback and real-world usage.",
    deliverables: [
      "Comprehensive testing",
      "Performance optimization",
      "Bug fixes",
      "User acceptance testing",
    ],
  },
  {
    number: "06",
    title: "Launch & Support",
    description:
      "We handle the deployment and provide ongoing support to ensure success. Monitoring and optimization continue post-launch.",
    deliverables: [
      "Deployment",
      "Training & documentation",
      "Monitoring setup",
      "Ongoing support",
    ],
  },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that ensures successful outcomes for every
            project, from initial concept to final delivery.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-12">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              {/* Number */}
              <div className="md:col-span-2">
                <span className="text-6xl font-bold text-muted-foreground/20">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-10">
                <div className="bg-background rounded-2xl p-8 border border-border">
                  <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
                  <p className="text-muted-foreground mb-6">
                    {step.description}
                  </p>

                  <div>
                    <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">
                      Deliverables
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-8">
            Let's discuss your project and how our process can help achieve your
            goals.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
          >
            Start a Project
          </a>
        </div>
      </div>
    </div>
  );
}
