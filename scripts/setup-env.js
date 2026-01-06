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

function generateSecret() {
  return crypto.randomBytes(32).toString('base64');
}

async function main() {
  console.log('🔒 Secure Environment Setup\n');

  let envContent = '';
  let currentEnv = {};

  if (fs.existsSync(envPath)) {
    console.log('✅ Found existing .env file. Loading...');
    envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        currentEnv[match[1].trim()] = match[2].trim().replace(/^"|"$/g, '');
      }
    });
  } else {
    console.log('⚠️  No .env file found. Creating one from scratch/template...');
    if (fs.existsSync(examplePath)) {
      envContent = fs.readFileSync(examplePath, 'utf8');
    }
  }

  const requiredKeys = [
    { key: 'DATABASE_URL', description: 'Database connection string', default: 'file:./dev.db' },
    { key: 'NEXTAUTH_URL', description: 'Canonical URL of the site', default: 'http://localhost:3000' },
    { key: 'NEXTAUTH_SECRET', description: 'Secret for NextAuth session signing', generate: true },
    { key: 'MFA_ENCRYPTION_KEY', description: '32-byte key for MFA secret encryption', generate: true },
    { key: 'CRON_SECRET', description: 'Secret key for securing cron jobs', generate: true },
  ];

  let newEnvContent = envContent;

  for (const item of requiredKeys) {
    let value = currentEnv[item.key];

    if (!value || value === 'generate-me-in-production' || value === 'generate-me-in-production-must-be-secure') {
      console.log(`\n📝 Configuration for ${item.key}:`);
      console.log(`   Description: ${item.description}`);

      if (item.generate) {
        const shouldGenerate = await question(`   ❓ Generate a secure random value? (Y/n) `);
        if (shouldGenerate.toLowerCase() !== 'n') {
          value = generateSecret();
          console.log(`   🔑 Generated: ${value.substring(0, 10)}...`);
        } else {
          value = await question(`   👉 Enter value for ${item.key}: `);
        }
      } else {
        const userValue = await question(`   👉 Enter value for ${item.key} (default: ${item.default}): `);
        value = userValue || item.default;
      }
    }

    // Update or append to content
    const regex = new RegExp(`^${item.key}=.*`, 'm');
    if (regex.test(newEnvContent)) {
      newEnvContent = newEnvContent.replace(regex, `${item.key}="${value}"`);
    } else {
      newEnvContent += `\n${item.key}="${value}"`;
    }
    
    // Update current map for subsequent checks
    currentEnv[item.key] = value;
  }

  // Write file
  fs.writeFileSync(envPath, newEnvContent.trim() + '\n');
  console.log(`\n✅ .env file updated successfully at ${envPath}`);
  
  // Verify Database
  if (currentEnv['DATABASE_URL'] && currentEnv['DATABASE_URL'].startsWith('file:')) {
     console.log('\n⚠️  Using SQLite (file:) database. Ensure "npm run prisma:migrate" is run.');
  }

  rl.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
