export type BuildProof = {
  commit: string;
  builtAt: string;
  depsSha256?: string;
  generated?: boolean;
  gatesConfigured?: string[];
  gatesRan?: Array<{ name: string; ran: boolean; passed?: boolean }>;
};

export type HeaderStatus = {
  name: string;
  key: string;
  value: string | null;
  ok: boolean;
};

export type ProofSnapshot = {
  headers: HeaderStatus[];
  buildProof: BuildProof | null;
  lastAuditAt?: string;
};

export const PROOF_HEADERS: Array<{ name: string; key: string }> = [
  { name: "Content-Security-Policy", key: "content-security-policy" },
  { name: "Strict-Transport-Security", key: "strict-transport-security" },
  { name: "X-Content-Type-Options", key: "x-content-type-options" },
  { name: "Referrer-Policy", key: "referrer-policy" },
];

export const PROOF_STORAGE_KEY = "proof-panel-latest";

export function isBuildVerified(buildProof: BuildProof | null): boolean {
  if (!buildProof) return false;
  return Boolean(buildProof.generated) && buildProof.commit !== "unknown";
}

export function areHeadersVerified(headers: HeaderStatus[]): boolean {
  if (headers.length === 0) return false;
  return headers.every((header) => header.ok);
}

export function getAuditStatus(headers: HeaderStatus[], buildProof: BuildProof | null) {
  const headersOk = areHeadersVerified(headers);
  const buildOk = isBuildVerified(buildProof);
  return {
    headersOk,
    buildOk,
    auditOk: headersOk && buildOk,
  };
}

export function truncateValue(value: string | null, max = 72) {
  if (!value) return "—";
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

export function loadProofSnapshot(): ProofSnapshot | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(PROOF_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ProofSnapshot;
  } catch {
    return null;
  }
}

export function saveProofSnapshot(snapshot: ProofSnapshot) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROOF_STORAGE_KEY, JSON.stringify(snapshot));
}
