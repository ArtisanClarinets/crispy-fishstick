export function calculateLeak(
  revenue: number,
  conversionRate: number, // percentage 0-100
  responseTime: number // minutes
) {
  // Normalize inputs to 0-1 risk factors

  // 1. Conversion Rate Risk: Lower is higher risk.
  // Assume 3% is decent baseline. Below 1% is critical.
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
  // e.g. at 100% risk, you are leaking maybe 20-30% of potential revenue
  const leakFactor = 0.30;
  const monthlyLeak = Math.round(revenue * weightedRisk * leakFactor);

  let band: "low" | "medium" | "high" = "low";
  if (riskScore > 30) band = "medium";
  if (riskScore > 70) band = "high";

  const remediation = [];
  if (riskScore > 0) {
      if (conversionRate < 1.5) remediation.push("Optimize checkout flow friction (likely drop-off point).");
      if (responseTime > 15) remediation.push("Automate initial lead response (< 5 mins).");
      if (band === "high") remediation.push("Full architectural audit recommended.");
  } else {
      remediation.push("Systems healthy. Focus on scaling traffic.");
  }

  return {
    riskScore, // 0-100
    monthlyLeak,
    band,
    remediation
  };
}
