import { describe, it, expect } from 'vitest';
import { redactForAudit } from './redact';

describe('redactForAudit', () => {
  it('should redact sensitive keys at top level', () => {
    const input = {
      password: 'secret',
      email: 'test@example.com',
      token: 'xyz',
    };
    const output = redactForAudit(input);
    expect(output).toEqual({
      password: '[REDACTED]',
      email: 'test@example.com',
      token: '[REDACTED]',
    });
  });

  it('should redact nested sensitive keys', () => {
    const input = {
      user: {
        passwordHash: 'hash',
        meta: {
          mfaSecret: 'secret',
        },
      },
    };
    const output = redactForAudit(input);
    expect(output).toEqual({
      user: {
        passwordHash: '[REDACTED]',
        meta: {
          mfaSecret: '[REDACTED]',
        },
      },
    });
  });

  it('should handle arrays', () => {
    const input = [
      { token: '123' },
      { apiKey: 'abc' },
    ];
    const output = redactForAudit(input);
    expect(output).toEqual([
      { token: '[REDACTED]' },
      { apiKey: '[REDACTED]' },
    ]);
  });

  it('should be case insensitive', () => {
    const input = {
      PASSWORD: '123',
      ApiKey: '456',
    };
    const output = redactForAudit(input);
    expect(output).toEqual({
      PASSWORD: '[REDACTED]',
      ApiKey: '[REDACTED]',
    });
  });

  it('should not mutate original object', () => {
    const input = { password: '123' };
    const output = redactForAudit(input);
    expect(input.password).toBe('123');
    expect(output.password).toBe('[REDACTED]');
  });
});
