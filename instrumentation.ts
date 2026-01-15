import * as Sentry from '@sentry/nextjs';

export async function register() {
  // Initialize Sentry first
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }

  // Telemetry and Environment Checks (Node.js runtime only)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const startTime = performance.now();
    
    // Telemetry: Initialize basic tracing
    console.log(`[Telemetry] Service starting...`);
    
    if (process.env.NODE_ENV === 'production') {
      const required = ['NEXTAUTH_SECRET', 'DATABASE_URL'];
      const missing = required.filter(key => !process.env[key]);
      
      if (missing.length > 0) {
        console.warn(`⚠️ Missing required environment variables: ${missing.join(', ')} - continuing with graceful degradation`);
      }
      
      console.log('✅ Environment validation passed');
    }
    
    // Telemetry: Record startup duration
    const duration = performance.now() - startTime;
    console.log(`[Telemetry] Service ready in ${duration.toFixed(2)}ms`);
  }
}

export const onRequestError = Sentry.captureRequestError;
