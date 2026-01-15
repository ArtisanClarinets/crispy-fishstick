#!/bin/bash
set -e

echo "Resetting Database..."

# Remove existing sqlite file if it exists
if [ -f "prisma/dev.db" ]; then
    rm prisma/dev.db
    echo "Removed prisma/dev.db"
fi

# Run setup again to recreate
bash .jules/setup.sh
