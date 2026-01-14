export function redactForAudit(obj: any): any {
  return recursiveRedact(obj);
}

const SENSITIVE_KEYS = new Set([
  'password',
  'passwordhash',
  'password_hash',
  'mfasecret',
  'mfa_secret',
  'secret',
  'token',
  'apikey',
  'api_key',
  'authorization',
  'cookie',
  'set-cookie',
  'access_token',
  'refresh_token',
  'id_token',
]);

function recursiveRedact(obj: any): any {
  if (!obj) return obj;

  if (Array.isArray(obj)) {
    return obj.map(recursiveRedact);
  }

  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key of Object.keys(obj)) {
      const lowerKey = key.toLowerCase();
      if (SENSITIVE_KEYS.has(lowerKey)) {
        newObj[key] = '[REDACTED]';
      } else {
        newObj[key] = recursiveRedact(obj[key]);
      }
    }
    return newObj;
  }

  return obj;
}
