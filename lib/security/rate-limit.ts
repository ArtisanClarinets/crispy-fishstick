// Basic rate limiting implementation
const rateLimit = {
  async check(ip: string, key: string) {
    // PRODUCTION: Implement with Redis/upstash
    console.log(`[RateLimit] Check: ${ip} - ${key}`);
    return { success: true };
  }
};
export { rateLimit };
