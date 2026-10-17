export type PasswordStrength = "empty" | "weak" | "almost" | "strong";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

const PASSWORD_RULES = {
  length: (p: string) => p.length >= 8,
  lower: (p: string) => /[a-z]/.test(p),
  upper: (p: string) => /[A-Z]/.test(p),
  digit: (p: string) => /\d/.test(p),
  symbol: (p: string) => /[^A-Za-z0-9]/.test(p),
};

export const isValidEmail = (email: string) => EMAIL_PATTERN.test(email.trim());

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return "empty";
  const failed = Object.entries(PASSWORD_RULES)
    .filter(([, passes]) => !passes(password))
    .map(([rule]) => rule);
  if (failed.length === 0) return "strong";
  return failed.length === 1 && failed[0] === "upper" ? "almost" : "weak";
};
