#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════
#  Vantus Systems - Database Validation Script
# ═══════════════════════════════════════════════════════════════════════

# This script validates database connectivity and schema synchronization
# for Prisma-based applications. It performs:
#   - Database connection health checks
#   - Prisma schema validation
#   - Migration status verification
#   - Schema synchronization checks

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    log_error "DATABASE_URL environment variable is not set"
    exit 1
fi

# Extract database type from URL
db_type="sqlite"
if [[ "$DATABASE_URL" == postgresql://* ]]; then
    db_type="postgresql"
elif [[ "$DATABASE_URL" == mysql://* ]]; then
    db_type="mysql"
elif [[ "$DATABASE_URL" == file:* ]]; then
    db_type="sqlite"
fi

log_info "Database type detected: $db_type"

# Function to check database connection
check_database_connection() {
    local max_retries=3
    local retry_delay=5
    local attempt=1
    
    log_info "Checking database connection..."
    
    while [ $attempt -le $max_retries ]; do
        if [ "$db_type" = "sqlite" ]; then
            # For SQLite, check if file exists or can be created
            db_path="${DATABASE_URL#file:}"
            db_dir="$(dirname "$db_path")"
            
            if [ ! -d "$db_dir" ]; then
                log_warning "Database directory doesn't exist: $db_dir"
                mkdir -p "$db_dir" || return 1
            fi
            
            # Check if we can write to the directory
            if [ ! -w "$db_dir" ]; then
                log_error "Cannot write to database directory: $db_dir"
                return 1
            fi
            
            log_success "SQLite database directory is accessible"
            return 0
            
        elif [ "$db_type" = "postgresql" ] || [ "$db_type" = "mysql" ]; then
            # For PostgreSQL/MySQL, try a simple connection test
            if npx prisma query --query "SELECT 1" &>/dev/null; then
                log_success "Database connection successful"
                return 0
            else
                log_warning "Database connection attempt $attempt/$max_retries failed"
                if [ $attempt -lt $max_retries ]; then
                    log_info "Retrying in $retry_delay seconds..."
                    sleep $retry_delay
                fi
            fi
        fi
        
        attempt=$((attempt + 1))
    done
    
    log_error "Failed to establish database connection after $max_retries attempts"
    return 1
}

# Function to validate Prisma schema
validate_prisma_schema() {
    log_info "Validating Prisma schema..."
    
    if npx prisma validate; then
        log_success "Prisma schema is valid"
        return 0
    else
        log_error "Prisma schema validation failed"
        return 1
    fi
}

# Function to check migration status
check_migration_status() {
    log_info "Checking migration status..."
    
    if npx prisma migrate status; then
        log_success "Migration status check completed"
        return 0
    else
        log_error "Migration status check failed"
        return 1
    fi
}

# Function to check schema synchronization
check_schema_sync() {
    log_info "Checking schema synchronization..."
    
    # Check if migrations directory exists
    if [ ! -d "prisma/migrations" ]; then
        log_warning "No migrations directory found"
        return 0
    fi
    
    # Count migrations
    migration_count=$(find prisma/migrations -name "*.sql" | wc -l)
    if [ $migration_count -eq 0 ]; then
        log_warning "No migrations found"
        return 0
    fi
    
    log_success "Found $migration_count migration files"
    
    # Check if database is in sync
    if npx prisma migrate status | grep -q "Database schema is up to date"; then
        log_success "Database schema is synchronized with migrations"
        return 0
    else
        log_warning "Database schema may not be synchronized"
        return 1
    fi
}

# Main validation function
validate_database() {
    log_info "Starting database validation..."
    echo ""
    
    # Step 1: Check database connection
    if ! check_database_connection; then
        log_error "Database validation failed: Connection check failed"
        return 1
    fi
    
    # Step 2: Validate Prisma schema
    if ! validate_prisma_schema; then
        log_error "Database validation failed: Schema validation failed"
        return 1
    fi
    
    # Step 3: Check migration status
    if ! check_migration_status; then
        log_error "Database validation failed: Migration status check failed"
        return 1
    fi
    
    # Step 4: Check schema synchronization
    if ! check_schema_sync; then
        log_warning "Database validation completed with warnings: Schema synchronization issues detected"
        return 0
    fi
    
    log_success "Database validation completed successfully!"
    return 0
}

# Run validation
validate_database

exit $?