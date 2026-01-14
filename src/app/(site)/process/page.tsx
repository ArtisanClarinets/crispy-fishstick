import type { Metadata } from "next";
import { VTLink } from "@/widgets/vt-link";
import { ExecutionProtocol, ProtocolStep } from "@/widgets/execution-protocol";
import { CalibrationHeadline } from "@/widgets/calibration-headline";

export const metadata: Metadata = {
  title: "Protocol",
  description: "A systematic engineering lifecycle. Every phase is gated by audit-grade artifacts.",
};

const protocolSteps: ProtocolStep[] = [
  {
    id: "step-01",
    number: "01",
    title: "Discovery & Baseline",
    description:
      "I map your goals, constraints, and surface hidden risks immediately. This establishes the immutable scope and success criteria before a single line of code is written.",
    commands: [
      { cmd: "init_risk_register", result: "OK" },
      { cmd: "define_scope_boundaries", result: "LOCKED" },
      { cmd: "map_success_metrics", result: "OK" },
      { cmd: "authorize_decision_log", result: "GEN" },
    ],
    artifacts: [
      { kind: "DOC", label: "SCOPE_BASELINE.pdf", sha: "e3b0c442..." },
      { kind: "LOG", label: "RISK_REGISTER_v1.csv" },
    ],
    meta: { duration: "1-2 Weeks", artifacts: 4, clientInput: "HIGH" },
  },
  {
    id: "step-02",
    title: "Strategy & Architecture",
    number: "02",
    description:
      "Requirements are translated into a deterministic build plan. I engineer the system architecture and define the exact verification gates required for launch.",
    commands: [
      { cmd: "gen_architecture_diagram", result: "OK" },
      { cmd: "compile_build_plan", result: "VERIFIED" },
      { cmd: "set_milestone_gates", result: "LOCKED" },
    ],
    artifacts: [
      { kind: "DOC", label: "BUILD_PLAN_GATES.pdf", sha: "8f43g211..." },
      { kind: "HASH", label: "ARCH_SNAPSHOT", sha: "9a21b44..." },
    ],
    meta: { duration: "1 Week", artifacts: 3, clientInput: "MED" },
  },
  {
    id: "step-03",
    title: "Design Systems",
    number: "03",
    description:
      "Visuals and engineering are unified. I produce interaction specs and design tokens that ensure the implementation matches the vision pixel-for-pixel.",
    commands: [
      { cmd: "export_tokens", result: "OK" },
      { cmd: "spec_components", result: "OK" },
      { cmd: "audit_accessibility_pre", result: "VERIFIED" },
    ],
    artifacts: [
      { kind: "DOC", label: "COMPONENT_SPEC.pdf" },
      { kind: "LOG", label: "TOKENS.json", sha: "11223344..." },
    ],
    meta: { duration: "2-3 Weeks", artifacts: 5, clientInput: "HIGH" },
  },
  {
    id: "step-04",
    title: "Production Development",
    number: "04",
    description:
      "Construction proceeds in auditable increments. The codebase is strictly typed, performance-budgeted, and instrumented for observability from day one.",
    commands: [
      { cmd: "compile_release_candidate", result: "OK" },
      { cmd: "enforce_perf_budget", result: "LOCKED" },
      { cmd: "inject_instrumentation", result: "OK" },
    ],
    artifacts: [
      { kind: "HASH", label: "COMMIT_SIGNATURE", sha: "7d7d7d7..." },
      { kind: "LOG", label: "RUNTIME_SCAN_RESULTS.json" },
    ],
    meta: { duration: "4-8 Weeks", artifacts: 12, clientInput: "LOW" },
  },
  {
    id: "step-05",
    title: "Verification & QA",
    number: "05",
    description:
      "The build is validated against the original evidence checklist. We don't guess—we prove that every requirement is met and every edge case is handled.",
    commands: [
      { cmd: "run_audit_suite", result: "VERIFIED" },
      { cmd: "verify_a11y_compliance", result: "OK" },
      { cmd: "stress_test_infrastructure", result: "OK" },
    ],
    artifacts: [
      { kind: "DOC", label: "AUDIT_REPORT_FINAL.pdf", sha: "aabbcc11..." },
      { kind: "LOG", label: "TEST_COVERAGE.xml" },
    ],
    meta: { duration: "1-2 Weeks", artifacts: 8, clientInput: "MED" },
  },
  {
    id: "step-06",
    title: "Launch Sequence",
    number: "06",
    description:
      "Deployment is a controlled event, not a panic. I provide a complete handoff package, runbooks, and monitoring to ensure long-term stability.",
    commands: [
      { cmd: "exec_launch_runbook", result: "OK" },
      { cmd: "verify_rollback_safety", result: "LOCKED" },
      { cmd: "transfer_ownership", result: "OK" },
    ],
    artifacts: [
      { kind: "DOC", label: "HANDOFF_PACKAGE.zip" },
      { kind: "DOC", label: "LAUNCH_checklist_signed.pdf" },
    ],
    meta: { duration: "1 Week", artifacts: 5, clientInput: "LOW" },
  },
  {
    id: "step-07",
    title: "Evolution",
    number: "07",
    description:
      "Software is living. Post-launch, we use collected metrics to iterate on the product, ensuring it adapts to user needs and market changes.",
    commands: [
      { cmd: "monitor_kpis", result: "ACTIVE" },
      { cmd: "analyze_user_flows", result: "OK" },
      { cmd: "plan_v2_features", result: "PENDING" },
    ],
    artifacts: [
      { kind: "LOG", label: "ANALYTICS_EXPORT.csv" },
      { kind: "DOC", label: "Q1_PERFORMANCE_REVIEW.pdf" },
    ],
    meta: { duration: "Ongoing", artifacts: 99, clientInput: "MED" },
  },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8" data-system-tone="work">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 md:mb-32">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
               <span className="font-mono text-emerald-500 mr-2">{">>"}</span>
               <CalibrationHeadline text="EXECUTION_PROTOCOL" />
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Systematic engineering lifecycle. Every phase is gated by audit-grade artifacts.
            </p>
          </div>
        </div>

        {/* Protocol Pipeline */}
        <ExecutionProtocol steps={protocolSteps} />

        {/* CTA */}
        <div className="mt-32 md:mt-48 text-center border-t border-border/5 pt-20">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">
            Ready to initialize?
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Define your scope and build the proof trail from day one.
          </p>
          <VTLink
            href="/contact"
            className="btn-precision inline-flex items-center justify-center px-10 py-5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium text-lg tracking-wide"
          >
            Start a Project
          </VTLink>
        </div>
      </div>
    </div>
  );
}
