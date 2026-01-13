import secrets
import base64
import os

def generate_secret(length=32, encoding='base64'):
    if encoding == 'base64':
        return secrets.token_urlsafe(length)
    elif encoding == 'hex':
        return secrets.token_hex(length)
    return secrets.token_urlsafe(length)

def main():
    if os.path.exists('.env'):
        print(".env already exists. Skipping generation.")
        return

    print("Generating .env from env.example...")

    with open('env.example', 'r') as f:
        lines = f.readlines()

    new_lines = []

    # Defaults and generated values
    generated_values = {
        'NODE_ENV': 'development',
        'NEXTAUTH_SECRET': generate_secret(),
        'MFA_ENCRYPTION_KEY': generate_secret(32, 'hex'),
        'CSRF_SECRET': generate_secret(),
        'CRON_SECRET': generate_secret(),
        'SESSION_ENCRYPTION_KEY': generate_secret(),
        'ESIGN_WEBHOOK_SECRET': generate_secret(32, 'hex'),
        'DATABASE_URL': 'file:./dev.db', # Default for sqlite
        'NEXTAUTH_URL': 'http://localhost:3000',
        'DEPLOY_DOMAIN': 'localhost',
        'REDIS_URL': 'redis://localhost:6379',
        'PORT': '3000',
        'LOG_LEVEL': 'debug',
    }

    for line in lines:
        stripped = line.strip()
        if not stripped or stripped.startswith('#'):
            new_lines.append(line)
            continue

        if '=' in stripped:
            key = stripped.split('=')[0]
            val = generated_values.get(key, '')

            # Use example value if present and we don't have a generated one
            # But the example file often has key="" or key=
            # so we stick to our generated list for critical ones

            if key in generated_values:
                new_lines.append(f'{key}="{generated_values[key]}"\n')
            else:
                # Keep original if we don't know what to put,
                # but maybe strip quotes and check if it has a value?
                # Actually, env.example usually has empty values.
                # If we don't have a value, we leave it empty.
                new_lines.append(line)
        else:
            new_lines.append(line)

    # Append DATABASE_URL if not found
    if not any('DATABASE_URL' in line for line in new_lines):
        new_lines.append('\n# Added by Jules setup\n')
        new_lines.append(f'DATABASE_URL="{generated_values["DATABASE_URL"]}"\n')

    with open('.env', 'w') as f:
        f.writelines(new_lines)

    print(".env generated successfully.")

if __name__ == '__main__':
    main()
