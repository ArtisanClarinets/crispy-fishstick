const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');

const envPath = path.join(process.cwd(), '.env');
const examplePath = path.join(process.cwd(), '.env.example');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const isRootUser = typeof process.getuid === 'function' ? process.getuid() === 0 : false;
const defaultDatabaseUrl = isRootUser ? 'file:/var/lib/vantus/prod.db' : 'file:./prisma/dev.db';
const defaultDatabaseInfo = isRootUser
  ? 'Production default: file:/var/lib/vantus/prod.db (ensure /var/lib/vantus is writable by the vantus user).'
  : 'Development default: file:./prisma/dev.db (relative to this repo). Switch to file:/var/lib/vantus/prod.db or your Postgres DSN when deploying.';

function generateSecret() {
  return crypto.randomBytes(32).toString('base64');
}

function generateMFAKey() {
  // 32-byte hex key for libsodium encryption
  return crypto.randomBytes(32).toString('hex');
}

async function askYesNo(query, defaultYes = true) {
  const suffix = defaultYes ? ' (Y/n)' : ' (y/N)';
  const response = await question(query + suffix + ' ');
  if (defaultYes) {
    return response.toLowerCase() !== 'n';
  }
  return response.toLowerCase() === 'y';
}

async function main() {
  console.log('🚀 Vantus Systems - Production Environment Setup\n');
  console.log('This interactive setup will configure all environment variables for production.\n');

  let envContent = '';
  let currentEnv = {};

  // Check for existing .env or production env file
  // Use the Vantus production env path by default
  const prodEnvPath = '/etc/default/vantus';
  const checkPath = fs.existsSync(prodEnvPath) ? prodEnvPath : envPath;

  if (fs.existsSync(checkPath)) {
    console.log(`✅ Found existing environment file: ${checkPath}`);
    const shouldLoad = await askYesNo('Load existing values?', true);
    if (shouldLoad) {
      envContent = fs.readFileSync(checkPath, 'utf8');
      envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          currentEnv[match[1].trim()] = match[2].trim().replace(/^"|"$/g, '');
        }
      });
    }
  } else {
    console.log('⚠️  No existing .env file found. Creating new configuration...');
    if (fs.existsSync(examplePath)) {
      envContent = fs.readFileSync(examplePath, 'utf8');
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                    REQUIRED CONFIGURATION');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // Core configuration
  const requiredKeys = [
    { 
      key: 'NODE_ENV', 
      description: 'Environment mode', 
      default: 'production',
      options: ['production', 'development']
    },
    { 
      key: 'PORT', 
      description: 'Port for Next.js server', 
      default: '3005'
    },
    { 
      key: 'DEPLOY_DOMAIN', 
      description: 'Primary domain (without www)', 
      default: 'vantus.systems',
      validate: (val) => {
        if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(val)) {
          return 'Please enter a valid domain (e.g., vantus.systems)';
        }
        return null;
      }
    },
    { 
      key: 'NEXTAUTH_URL', 
      description: 'Full canonical URL of your site', 
      default: 'https://vantus.systems',
      derived: (env) => {
        const domain = env['DEPLOY_DOMAIN'] || 'vantus.systems';
        return `https://${domain}`;
      }
    },
    { 
      key: 'DATABASE_URL', 
      description: 'Database connection string', 
      default: defaultDatabaseUrl,
      info: `${defaultDatabaseInfo}\nFor PostgreSQL: postgresql://user:pass@localhost:5432/dbname`
    },
  ];

  console.log('📋 Core Application Settings:\n');

  let newEnvContent = envContent;
  
  for (const item of requiredKeys) {
    let value = currentEnv[item.key];

    // Skip if already set and valid
    if (value && value !== 'generate-me-in-production' && value !== 'generate-me-in-production-must-be-secure') {
      console.log(`   ✓ ${item.key}: ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`);
      continue;
    }

    console.log(`\n📝 ${item.key}:`);
    console.log(`   ${item.description}`);
    if (item.info) {
      console.log(`   ℹ️  ${item.info}`);
    }

    // Check if value can be derived
    if (item.derived) {
      const derivedValue = item.derived(currentEnv);
      const useDefault = await askYesNo(`   Use derived value: ${derivedValue}?`, true);
      if (useDefault) {
        value = derivedValue;
      }
    }

    if (!value) {
      if (item.options) {
        console.log(`   Options: ${item.options.join(', ')}`);
      }
      const userValue = await question(`   👉 Enter value (default: ${item.default}): `);
      value = userValue.trim() || item.default;
    }

    // Validate if validator exists
    if (item.validate) {
      const error = item.validate(value);
      if (error) {
        console.log(`   ❌ ${error}`);
        const retry = await question(`   👉 Enter value again: `);
        value = retry.trim() || item.default;
      }
    }

    // Update environment
    const regex = new RegExp(`^${item.key}=.*`, 'm');
    if (regex.test(newEnvContent)) {
      newEnvContent = newEnvContent.replace(regex, `${item.key}="${value}"`);
    } else {
      newEnvContent += `\n${item.key}="${value}"`;
    }
     
    currentEnv[item.key] = value;
  }

  // Apply production-specific defaults or auto-generation
  const productionMode = currentEnv['NODE_ENV'] === 'production';
  
  if (productionMode) {
    // Enforce production defaults for critical settings
    if (!currentEnv['NODE_ENV'] || currentEnv['NODE_ENV'] === '') {
      currentEnv['NODE_ENV'] = 'production';
      const nodeEnvRegex = new RegExp(`^NODE_ENV=.*`, 'm');
      if (nodeEnvRegex.test(newEnvContent)) {
        newEnvContent = newEnvContent.replace(nodeEnvRegex, `NODE_ENV="production"`);
      } else {
        newEnvContent += `\nNODE_ENV="production"`;
      }
    }
    
    if (!currentEnv['LOG_LEVEL'] || currentEnv['LOG_LEVEL'] === '') {
      currentEnv['LOG_LEVEL'] = 'error';
      const logLevelRegex = new RegExp(`^LOG_LEVEL=.*`, 'm');
      if (logLevelRegex.test(newEnvContent)) {
        newEnvContent = newEnvContent.replace(logLevelRegex, `LOG_LEVEL="error"`);
      } else {
        newEnvContent += `\nLOG_LEVEL="error"`;
      }
    }
    
    // Critical security: Ensure all required secrets are generated for production
    const criticalSecrets = [
      { key: 'NEXTAUTH_SECRET', genFunc: generateSecret },
      { key: 'MFA_ENCRYPTION_KEY', genFunc: generateMFAKey },
      { key: 'CSRF_SECRET', genFunc: generateSecret },
      { key: 'CRON_SECRET', genFunc: generateSecret },
      { key: 'SESSION_ENCRYPTION_KEY', genFunc: generateSecret }
    ];
    
    for (const secret of criticalSecrets) {
      if (!currentEnv[secret.key] || currentEnv[secret.key] === '' || currentEnv[secret.key] === 'generate-me-in-production-must-be-secure') {
        console.log(`Generating secure secret for ${secret.key}...`);
        const generatedValue = secret.genFunc();
        currentEnv[secret.key] = generatedValue;
        const secretRegex = new RegExp(`^${secret.key}=.*`, 'm');
        if (secretRegex.test(newEnvContent)) {
          newEnvContent = newEnvContent.replace(secretRegex, `${secret.key}="${generatedValue}"`);
        } else {
          newEnvContent += `\n${secret.key}="${generatedValue}"`;
        }
      }
    }
    
    // Force strong admin password in production
    if (!currentEnv['ADMIN_BOOTSTRAP_PASSWORD'] || currentEnv['ADMIN_BOOTSTRAP_PASSWORD'] === '' || currentEnv['ADMIN_BOOTSTRAP_PASSWORD'] === 'admin') {
      const strongPassword = generateSecret(16);
      currentEnv['ADMIN_BOOTSTRAP_PASSWORD'] = strongPassword;
      console.log(`Generated strong initial ADMIN_BOOTSTRAP_PASSWORD for production: ${strongPassword}`);
      const passwordRegex = new RegExp(`^ADMIN_BOOTSTRAP_PASSWORD=.*`, 'm');
      if (passwordRegex.test(newEnvContent)) {
        newEnvContent = newEnvContent.replace(passwordRegex, `ADMIN_BOOTSTRAP_PASSWORD="${strongPassword}"`);
      } else {
        newEnvContent += `\nADMIN_BOOTSTRAP_PASSWORD="${strongPassword}"`;
      }
    }
  }

  // Security Keys
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                    SECURITY CONFIGURATION');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const securityKeys = [
    { 
      key: 'NEXTAUTH_SECRET', 
      description: 'Secret for NextAuth.js session signing (JWT)', 
      generate: true,
      required: true
    },
    { 
      key: 'MFA_ENCRYPTION_KEY', 
      description: '32-byte hex key for MFA secret encryption', 
      generate: true,
      required: true,
      customGen: generateMFAKey
    },
    {
      key: 'CRON_SECRET',
      description: 'Secret key for securing cron job endpoints',
      generate: true,
      required: true
    },
    {
      key: 'SESSION_ENCRYPTION_KEY',
      description: 'Secret for session data encryption',
      generate: true,
      required: true
    },
  ];

  for (const item of securityKeys) {
    let value = currentEnv[item.key];

    if (!value || value === 'generate-me-in-production' || value === 'generate-me-in-production-must-be-secure') {
      console.log(`\n🔐 ${item.key}:`);
      console.log(`   ${item.description}`);

      if (item.generate) {
        const shouldGenerate = await askYesNo('   Generate a secure random value?', true);
        if (shouldGenerate) {
          value = item.customGen ? item.customGen() : generateSecret();
          console.log(`   ✓ Generated: ${value.substring(0, 12)}...`);
        } else {
          value = await question(`   👉 Enter value for ${item.key}: `);
        }
      }
    } else {
      console.log(`   ✓ ${item.key}: [already set]`);
    }

    const regex = new RegExp(`^${item.key}=.*`, 'm');
    if (regex.test(newEnvContent)) {
      newEnvContent = newEnvContent.replace(regex, `${item.key}="${value}"`);
    } else {
      newEnvContent += `\n${item.key}="${value}"`;
    }
    
    currentEnv[item.key] = value;
  }

  // Admin Bootstrap
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                 ADMIN ACCOUNT CONFIGURATION');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const adminKeys = [
    { 
      key: 'ADMIN_BOOTSTRAP_EMAIL', 
      description: 'Admin user email for initial setup', 
      default: 'admin@vantus.systems',
      required: true
    },
    { 
      key: 'ADMIN_BOOTSTRAP_PASSWORD', 
      description: 'Admin user password (change after first login!)', 
      default: '',
      required: true,
      secure: true
    },
  ];

  for (const item of adminKeys) {
    let value = currentEnv[item.key];

    if (!value || value === 'admin' || value === 'admin@vantus.com') {
      console.log(`\n👤 ${item.key}:`);
      console.log(`   ${item.description}`);
      
      if (item.secure) {
        console.log(`   ⚠️  Use a strong password - you can change it after first login`);
      }

      const userValue = await question(`   👉 Enter ${item.key} ${item.default ? `(default: ${item.default})` : ''}: `);
      value = userValue.trim() || item.default;

      if (!value && item.required) {
        console.log(`   ❌ This field is required!`);
        const retry = await question(`   👉 Enter value: `);
        value = retry.trim();
      }
    } else {
      console.log(`   ✓ ${item.key}: ${item.secure ? '[set]' : value}`);
    }

    const regex = new RegExp(`^${item.key}=.*`, 'm');
    if (regex.test(newEnvContent)) {
      newEnvContent = newEnvContent.replace(regex, `${item.key}="${value}"`);
    } else {
      newEnvContent += `\n${item.key}="${value}"`;
    }
    
    currentEnv[item.key] = value;
  }

  // Optional Features
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('              OPTIONAL FEATURES (Press Enter to skip)');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const optionalKeys = [
    { 
      key: 'REDIS_URL', 
      description: 'Redis connection for caching/rate limiting', 
      default: '',
      info: 'Example: redis://localhost:6379'
    },
    { 
      key: 'AWS_REGION', 
      description: 'AWS region for S3 media uploads', 
      default: '',
      info: 'Example: us-east-1'
    },
    { 
      key: 'AWS_ACCESS_KEY_ID', 
      description: 'AWS access key for S3', 
      default: ''
    },
    { 
      key: 'AWS_SECRET_ACCESS_KEY', 
      description: 'AWS secret key for S3', 
      default: '',
      secure: true
    },
    { 
      key: 'S3_BUCKET_NAME', 
      description: 'S3 bucket name for media storage', 
      default: ''
    },
  ];

  console.log('⚙️  Configure optional features (or press Enter to skip):\n');

  for (const item of optionalKeys) {
    let value = currentEnv[item.key];

    if (!value) {
      const shouldConfigure = await askYesNo(`\nConfigure ${item.key}?`, false);
      
      if (shouldConfigure) {
        console.log(`   ${item.description}`);
        if (item.info) {
          console.log(`   ℹ️  ${item.info}`);
        }
        value = await question(`   👉 Enter value: `);
        value = value.trim();
      }
    } else {
      console.log(`   ✓ ${item.key}: ${item.secure ? '[set]' : value}`);
    }

    if (value) {
      const regex = new RegExp(`^${item.key}=.*`, 'm');
      if (regex.test(newEnvContent)) {
        newEnvContent = newEnvContent.replace(regex, `${item.key}="${value}"`);
      } else {
        newEnvContent += `\n${item.key}="${value}"`;
      }
      
      currentEnv[item.key] = value;
    }
  }

  // Write file
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                    SAVING CONFIGURATION');
  console.log('═══════════════════════════════════════════════════════════════\n');

  fs.writeFileSync(envPath, newEnvContent.trim() + '\n');
  console.log(`✅ Environment configuration saved to: ${envPath}`);
  
  // Summary
  console.log('\n📊 Configuration Summary:');
  console.log(`   Domain: ${currentEnv['DEPLOY_DOMAIN']}`);
  console.log(`   URL: ${currentEnv['NEXTAUTH_URL']}`);
  console.log(`   Database: ${currentEnv['DATABASE_URL']}`);
  console.log(`   Admin Email: ${currentEnv['ADMIN_BOOTSTRAP_EMAIL']}`);
  console.log(`   Port: ${currentEnv['PORT']}`);
  
  // Warnings
  if (currentEnv['DATABASE_URL'] && currentEnv['DATABASE_URL'].startsWith('file:')) {
    console.log('\n⚠️  Using SQLite database. Make sure to:');
    console.log('   1. Run database migrations: npx prisma migrate deploy');
    console.log('   2. Seed admin user: npx prisma db seed');
  }

  if (currentEnv['ADMIN_BOOTSTRAP_PASSWORD'] === 'admin') {
    console.log('\n⚠️  WARNING: Using default admin password!');
    console.log('   Please change the password immediately after first login!');
  }

  console.log('\n✅ Setup complete! Next steps:');
  console.log('   1. Review the generated .env file');
  console.log('   2. Run: npm install');
  console.log('   3. Run: npx prisma generate');
  console.log('   4. Run: npx prisma migrate deploy');
  console.log('   5. Run: npx prisma db seed');
  console.log('   6. Run: npm run build');
  console.log('   7. Start the server: npm start\n');

  rl.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
