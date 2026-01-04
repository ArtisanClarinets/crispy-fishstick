export interface RemediationStep {
  type: 'critical' | 'warning' | 'info';
  issue: string;
  action: string;
  link?: { label: string; href: string };
}

export function calculateLeak(
  revenue: number,
  conversionRate: number, // percentage 0-100
  responseTime: number // minutes
) {
  // Normalize inputs to 0-1 risk factors

  // 1. Conversion Rate Risk: Lower is higher risk.
  // Assume 3% is decent baseline. Below 1.5% is critical.
  const convRisk = Math.max(0, Math.min(1, (3 - conversionRate) / 2.5));

  // 2. Response Time Risk: Higher is higher risk.
  // 5 min is great. 60 min is bad.
  const timeRisk = Math.max(0, Math.min(1, (responseTime - 5) / 55));

  // Weighted Risk Score (0-100)
  // Conversion carries more weight for immediate revenue
  const weightedRisk = (convRisk * 0.6 + timeRisk * 0.4);
  const riskScore = Math.round(weightedRisk * 100);

  // Leak Estimation
  // A simplistic model: Risk % * Revenue * Severity Factor
  // e.g. at 100% risk, you are leaking maybe 30% of potential revenue
  const leakFactor = 0.30;
  const monthlyLeak = Math.round(revenue * weightedRisk * leakFactor);

  let band: "low" | "medium" | "high" = "low";
  if (riskScore > 30) band = "medium";
  if (riskScore > 70) band = "high";

  const remediation: RemediationStep[] = [];

  if (conversionRate < 1.5) {
    remediation.push({
      type: 'critical',
      issue: 'Friction detected in transactional layer.',
      action: 'UX audit of checkout process recommended.',
      link: { label: 'Review Process', href: '/process' }
    });
  }

  if (responseTime > 5) {
    remediation.push({
      type: responseTime > 30 ? 'critical' : 'warning',
      issue: `Latency detected in intake layer (${responseTime}m).`,
      action: 'Implementation of edge-function auto-responders recommended.',
      link: { label: 'View Architecture Services', href: '/process' }
    });
  }

  if (band === 'high') {
    remediation.push({
      type: 'critical',
      issue: 'Critical inefficiencies detected.',
      action: 'Full architectural audit recommended.',
      link: { label: 'Book a Consultation', href: '/contact' }
    });
  } else if (band === 'medium') {
     remediation.push({
      type: 'warning',
      issue: 'Sub-optimal performance patterns.',
      action: 'Optimization of frontend bundle suggested.',
      link: { label: 'View Performance Process', href: '/process' }
    });
  } else if (remediation.length === 0) {
    remediation.push({
      type: 'info',
      issue: 'Systems operating within nominal parameters.',
      action: 'Focus on scaling traffic acquisition.',
    });
  }

  return {
    riskScore, // 0-100
    monthlyLeak,
    band,
    remediation
  };
}
