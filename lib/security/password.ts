export function validatePassword(password: string): string | null {
  if (password.length < 12) {
    return "Password must be at least 12 characters";
  }
  
  // Complexity checks
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (!hasUpperCase) return "Password must contain at least one uppercase letter";
  if (!hasLowerCase) return "Password must contain at least one lowercase letter";
  if (!hasNumbers) return "Password must contain at least one number";
  // We encourage special chars but maybe not strict enforcement if length is sufficient? 
  // Requirement says "Reject common weak passwords (implement a simple denylist + entropy-ish checks)"
  // I'll enforce special char for "entropy-ish".
  if (!hasSpecial) return "Password must contain at least one special character";

  const commonPasswords = ["password", "12345678", "qwerty", "admin", "welcome"];
  if (commonPasswords.some(p => password.toLowerCase().includes(p))) {
    return "Password contains common patterns";
  }

  return null;
}
