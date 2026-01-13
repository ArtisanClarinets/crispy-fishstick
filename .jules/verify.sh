#!/bin/bash
set -e

echo "Starting Verification Process..."

# 1. Linting
echo "Running Lint..."
npm run lint

# 2. Type Checking
echo "Running Type Check..."
# Assuming tsc is available via npx or script
if grep -q "check-types" package.json; then
    npm run check-types
else
    npx tsc --noEmit
fi

# 3. Unit Tests
echo "Running Unit Tests..."
npm run test

# 4. Build Check
echo "Running Build..."
# We use a dummy build to check for errors, but might not want to wait for full optimization if possible.
# However, next build is the standard way.
npm run build

echo "All verifications passed successfully!"
