#!/bin/bash
set -e

echo "Initializing Jules Environment..."

# 1. Setup Environment Variables
if [ ! -f .env ]; then
    echo "Creating .env..."
    python3 .jules/setup_env.py
else
    echo ".env already exists."
fi

# 2. Install Dependencies
echo "Installing dependencies..."
npm install

# 3. Install Playwright Browsers
echo "Installing Playwright browsers..."
npx playwright install --with-deps

# 4. Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# 5. Database Setup (SQLite)
# Check if using sqlite (based on DATABASE_URL in .env)
if grep -q "file:" .env; then
    echo "Detected SQLite. Running migrations..."
    # Ensure the file exists
    touch prisma/dev.db
    npx prisma migrate dev --name init --skip-seed

    echo "Seeding database..."
    npx prisma db seed
else
    echo "Not using SQLite or DATABASE_URL not set to file:. Skipping auto-migration."
    echo "Please ensure your database is running and migrated."
fi

echo "Jules Environment Setup Complete!"
