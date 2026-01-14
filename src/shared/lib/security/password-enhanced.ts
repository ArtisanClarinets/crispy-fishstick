import bcrypt from "bcryptjs";
import { prisma } from "../prisma";

// Common password list (subset of 10,000+ common passwords)
const COMMON_PASSWORD_LIST = [
  "password", "123456", "12345678", "1234", "qwerty", "12345", "dragon",
  "baseball", "football", "letmein", "monkey", "abc123", "mustang",
  "michael", "shadow", "master", "jennifer", "111111", "2000",
  "jordan", "superman", "harley", "1234567", "freedom", "whatever",
  "trustno1", "sunshine", "iloveyou", "starwars", "bailey", "jesus",
  "nicholas", "matthew", "hello", "azerty", "654321", "password1",
  "admin", "welcome", "login", "passw0rd", "master", "hello123",
  "freedom", "whatever", "trustno1", "696969", "batman", "spiderman",
  "superman", "ironman", "hulk", "thor", "captain", "america", "avenger",
  "wolverine", "deadpool", "gandalf", "frodo", "bilbo", "legolas", "aragorn",
  "gimli", "sauron", "darth", "vader", "luke", "leia", "han", "solo", "yoda",
  "obiwan", "anakin", "padme", "chewbacca", "r2d2", "c3po", "boba", "fett",
  "jabba", "palpatine", "skywalker", "kenobi", "sith", "jedi", "tatooine",
  "hoth", "endor", "dagobah", "naboo", "coruscant", "kashyyyk", "mustafar",
  "alderaan", "bespin", "geonosis", "kamino", "utapau", "felucia", "mygeeto",
  "saleucami", "cato", "neimoidia", "kessel", "ord", "mantell", "byss",
  "dantooine", "yavin", "hoth", "dagobah", "endor", "jakku", "takodana",
  "starkiller", "ahchto", "crait", "exegol", "pasaana", "kijimi", "ajan",
  "kloss", "chandrila", "corellia", "dathomir", "felucia", "geonosis",
  "hoth", "kamino", "kashyyyk", "mustafar", "mygeeto", "naboo", "ord",
  "mantell", "saleucami", "scarif", "sullust", "tatooine", "utapau",
  "yavin", "zakarr", "zakuul", "ziost", "abregado", "alderaan", "anch",
  "toine", "bastion", "bespin", "byss", "cato", "neimoidia", "chandrila",
  "corellia", "dantooine", "dathomir", "dagobah", "endor", "felucia",
  "geonosis", "hoth", "jakku", "kamino", "kashyyyk", "korriban",
  "malachor", "mandalore", "mantell", "mon", "calamari", "mustafar",
  "mygeeto", "naboo", "ord", "mantell", "pasaana", "quermia", "raleigh",
  "rishi", "ruusan", "saleucami", "scarif", "serenno", "sullust",
  "tatooine", "takodana", "utapau", "yavin", "zakarr", "zakuul", "ziost"
];

// Character diversity categories for entropy calculation
const CHARACTER_CATEGORIES = [
  /[a-z]/,      // Lowercase letters
  /[A-Z]/,      // Uppercase letters
  /[0-9]/,      // Numbers
  /[^a-zA-Z0-9]/ // Special characters
];

/**
 * Calculate password entropy in bits
 * @param password The password to calculate entropy for
 * @returns Entropy in bits
 */
export function calculatePasswordEntropy(password: string): number {
  if (!password || password.length === 0) return 0;

  // Count unique character categories used
  let uniqueCategories = 0;
  for (const category of CHARACTER_CATEGORIES) {
    if (category.test(password)) {
      uniqueCategories++;
    }
  }

  // Calculate possible combinations
  // Base pool size: 26 lowercase + 26 uppercase + 10 digits + 32 special chars = 94
  const poolSize = uniqueCategories === 1 ? 26 : 
                   uniqueCategories === 2 ? 52 : 
                   uniqueCategories === 3 ? 62 : 94;

  // Entropy = log2(poolSize^length)
  const entropy = Math.log2(Math.pow(poolSize, password.length));
  return entropy;
}

/**
 * Check if password is in common password list
 * @param password The password to check
 * @returns True if password is common, false otherwise
 */
export function isCommonPassword(password: string): boolean {
  const lowerPassword = password.toLowerCase();
  return COMMON_PASSWORD_LIST.includes(lowerPassword);
}

/**
 * Check if password has been previously used by the user
 * @param userId The user ID
 * @param newPassword The new password to check
 * @returns True if password has been used before, false otherwise
 */
export async function isPasswordInHistory(userId: string, newPassword: string): Promise<boolean> {
  try {
    // Get the last 5 password hashes for this user
    const passwordHistory = await prisma.passwordHistory.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });

    // Check if the new password matches any of the previous hashes
    for (const historyEntry of passwordHistory) {
      const isMatch = await bcrypt.compare(newPassword, historyEntry.passwordHash);
      if (isMatch) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking password history:', error);
    // Fail safe - allow password change if we can't check history
    return false;
  }
}

/**
 * Check if password has been breached using HaveIBeenPwned API
 * @param password The password to check
 * @returns True if password has been breached, false otherwise
 */
export async function isPasswordBreached(password: string): Promise<boolean> {
  try {
    // Hash the password using SHA-1 (as required by HIBP API)
    const sha1 = require('crypto').createHash('sha1');
    const hash = sha1.update(password).digest('hex').toUpperCase();

    // Get the first 5 characters of the hash
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);

    // Call HaveIBeenPwned API
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.haveibeenpwned.v2+json',
        'Add-Padding': 'true' // Privacy enhancement
      }
    });

    if (!response.ok) {
      // If API is unavailable, we'll allow the password but log it
      console.warn('HaveIBeenPwned API unavailable, proceeding without breach check');
      return false;
    }

    const data = await response.text();
    const lines = data.split('\n');

    // Check if our suffix exists in the response
    for (const line of lines) {
      const [lineSuffix] = line.split(':');
      if (lineSuffix === suffix) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking password breach status:', error);
    // Fail safe - allow password if we can't check breach status
    return false;
  }
}

/**
 * Enhanced password validation with comprehensive security checks
 * @param password The password to validate
 * @param userId Optional user ID for password history check
 * @returns Error message if validation fails, null if password is valid
 */
export async function validatePasswordEnhanced(password: string, userId?: string): Promise<string | null> {
  // Basic length check
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
  if (!hasSpecial) return "Password must contain at least one special character";

  // Entropy check (minimum 30 bits)
  const entropy = calculatePasswordEntropy(password);
  if (entropy < 30) {
    return "Password does not meet minimum entropy requirements (30 bits)";
  }

  // Common password check
  if (isCommonPassword(password)) {
    return "Password is too common and easily guessable";
  }

  // Password history check (if userId provided)
  if (userId) {
    const isInHistory = await isPasswordInHistory(userId, password);
    if (isInHistory) {
      return "Password has been used before. Please choose a different password";
    }
  }

  // Breach detection check
  const isBreached = await isPasswordBreached(password);
  if (isBreached) {
    return "This password has been exposed in a data breach. Please choose a different password";
  }

  return null;
}

/**
 * Add password to user's password history
 * @param userId The user ID
 * @param passwordHash The password hash to store
 */
export async function addToPasswordHistory(userId: string, passwordHash: string): Promise<void> {
  try {
    // Keep only the last 5 passwords
    const existingHistory = await prisma.passwordHistory.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });

    // If we already have 5 entries, delete the oldest one
    if (existingHistory.length >= 5) {
      const oldestEntry = existingHistory[existingHistory.length - 1];
      await prisma.passwordHistory.delete({
        where: {
          id: oldestEntry.id
        }
      });
    }

    // Add the new password to history
    await prisma.passwordHistory.create({
      data: {
        userId: userId,
        passwordHash: passwordHash,
        createdAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error adding password to history:', error);
    // Don't fail the password change if we can't update history
  }
}