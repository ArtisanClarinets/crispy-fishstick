export async function register() {
  const startTime = performance.now();
  
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Telemetry: Initialize basic tracing
    console.log(`[Telemetry] Service starting...`);
    
    if (process.env.NODE_ENV === 'production') {
      const required = ['NEXTAUTH_SECRET', 'DATABASE_URL'];
      const missing = required.filter(key => !process.env[key]);
      
      if (missing.length > 0) {
        console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
        process.exit(1);
      }
      
      console.log('✅ Environment validation passed');
    }
    
    // Telemetry: Record startup duration
    const duration = performance.now() - startTime;
    console.log(`[Telemetry] Service ready in ${duration.toFixed(2)}ms`);
  }
}
