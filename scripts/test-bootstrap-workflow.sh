#!/bin/bash

# Vantus Systems - Bootstrap Workflow Test Script
# This script tests the key components of the bootstrap workflow

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

# Test database validation script exists and is executable
test_database_validation_script() {
    log_info "Testing database validation script..."
    
    if [ -f "scripts/validate-database.sh" ]; then
        if [ -x "scripts/validate-database.sh" ]; then
            log_success "✓ Database validation script exists and is executable"
            return 0
        else
            log_error "✗ Database validation script is not executable"
            return 1
        fi
    else
        log_error "✗ Database validation script not found"
        return 1
    fi
}

# Test file permission validation script exists and is executable
test_file_permission_validation_script() {
    log_info "Testing file permission validation script..."
    
    if [ -f "scripts/validate-file-permissions.sh" ]; then
        if [ -x "scripts/validate-file-permissions.sh" ]; then
            log_success "✓ File permission validation script exists and is executable"
            return 0
        else
            log_error "✗ File permission validation script is not executable"
            return 1
        fi
    else
        log_error "✗ File permission validation script not found"
        return 1
    fi
}

# Test setup environment script exists
test_setup_env_script() {
    log_info "Testing setup environment script..."
    
    if [ -f "scripts/setup-env.js" ]; then
        log_success "✓ Setup environment script exists"
        return 0
    else
        log_error "✗ Setup environment script not found"
        return 1
    fi
}

# Test Nginx configuration generation script exists
test_nginx_generation_script() {
    log_info "Testing Nginx configuration generation script..."
    
    if [ -f "scripts/generate-nginx-config.mjs" ]; then
        log_success "✓ Nginx configuration generation script exists"
        return 0
    else
        log_error "✗ Nginx configuration generation script not found"
        return 1
    fi
}

# Test configuration files exist
test_configuration_files() {
    log_info "Testing configuration files..."
    
    local missing_files=0
    
    # Check Nginx config
    if [ -f "config/nginx/nginx.conf" ]; then
        log_success "✓ Nginx configuration file exists"
    else
        log_error "✗ Nginx configuration file not found"
        missing_files=1
    fi
    
    # Check Supervisor config
    if [ -f "config/supervisor/vantus.conf" ]; then
        log_success "✓ Supervisor configuration file exists"
    else
        log_error "✗ Supervisor configuration file not found"
        missing_files=1
    fi
    
    # Check Systemd service
    if [ -f "config/systemd/vantus.service" ]; then
        log_success "✓ Systemd service configuration file exists"
    else
        log_error "✗ Systemd service configuration file not found"
        missing_files=1
    fi
    
    return $missing_files
}

# Test environment file structure
test_environment_file() {
    log_info "Testing environment file structure..."
    
    if [ -f ".env" ]; then
        # Check for required variables
        local required_vars=("NODE_ENV" "PORT" "DEPLOY_DOMAIN" "DATABASE_URL" "NEXTAUTH_SECRET")
        local missing_vars=0
        
        for var in "${required_vars[@]}"; do
            if grep -q "^$var=" .env; then
                log_success "✓ Required environment variable $var is set"
            else
                log_error "✗ Required environment variable $var is missing"
                missing_vars=1
            fi
        done
        
        return $missing_vars
    else
        log_error "✗ Environment file not found"
        return 1
    fi
}

# Test Prisma configuration
test_prisma_configuration() {
    log_info "Testing Prisma configuration..."
    
    if [ -f "prisma/schema.prisma" ]; then
        log_success "✓ Prisma schema file exists"
        
        # Check for required Prisma components
        if grep -q "generator client" prisma/schema.prisma; then
            log_success "✓ Prisma client generator configured"
        else
            log_error "✗ Prisma client generator not configured"
            return 1
        fi
        
        if grep -q "datasource db" prisma/schema.prisma; then
            log_success "✓ Prisma datasource configured"
        else
            log_error "✗ Prisma datasource not configured"
            return 1
        fi
        
        return 0
    else
        log_error "✗ Prisma schema file not found"
        return 1
    fi
}

# Test package.json scripts
test_package_json_scripts() {
    log_info "Testing package.json scripts..."
    
    if [ -f "package.json" ]; then
        # Check for required scripts
        local required_scripts=("build" "dev" "start")
        local missing_scripts=0
        
        for script in "${required_scripts[@]}"; do
            if grep -q "\"$script\":" package.json; then
                log_success "✓ Required script $script is defined"
            else
                log_error "✗ Required script $script is missing"
                missing_scripts=1
            fi
        done
        
        return $missing_scripts
    else
        log_error "✗ package.json not found"
        return 1
    fi
}

# Test bootstrap script structure
test_bootstrap_script_structure() {
    log_info "Testing bootstrap script structure..."
    
    local bootstrap_script="scripts/bootstrap-ubuntu22.sh"
    
    if [ -f "$bootstrap_script" ]; then
        log_success "✓ Bootstrap script exists"
        
        # Check for key sections
        if grep -q "STEP 1: Creating Application User" "$bootstrap_script"; then
            log_success "✓ User creation step found"
        else
            log_error "✗ User creation step missing"
            return 1
        fi
        
        if grep -q "STEP 2: Install System Dependencies" "$bootstrap_script"; then
            log_success "✓ Dependency installation step found"
        else
            log_error "✗ Dependency installation step missing"
            return 1
        fi
        
        if grep -q "STEP 7: Database Setup" "$bootstrap_script"; then
            log_success "✓ Database setup step found"
        else
            log_error "✗ Database setup step missing"
            return 1
        fi
        
        if grep -q "STEP 8: Build Application" "$bootstrap_script"; then
            log_success "✓ Application build step found"
        else
            log_error "✗ Application build step missing"
            return 1
        fi
        
        if grep -q "STEP 9: Generate & Configure Nginx" "$bootstrap_script"; then
            log_success "✓ Nginx configuration step found"
        else
            log_error "✗ Nginx configuration step missing"
            return 1
        fi
        
        return 0
    else
        log_error "✗ Bootstrap script not found"
        return 1
    fi
}

# Test error handling in bootstrap script
test_bootstrap_error_handling() {
    log_info "Testing bootstrap script error handling..."
    
    local bootstrap_script="scripts/bootstrap-ubuntu22.sh"
    
    if [ -f "$bootstrap_script" ]; then
        # Check for error handling patterns
        if grep -q "set -e" "$bootstrap_script"; then
            log_success "✓ Bootstrap script has error handling enabled"
        else
            log_error "✗ Bootstrap script missing error handling"
            return 1
        fi
        
        # Check for validation functions
        if grep -q "validate_file" "$bootstrap_script"; then
            log_success "✓ Bootstrap script includes file validation"
        else
            log_warning "⚠ Bootstrap script may not include file validation"
        fi
        
        # Check for retry logic
        if grep -q "max_retries" "$bootstrap_script"; then
            log_success "✓ Bootstrap script includes retry logic"
        else
            log_warning "⚠ Bootstrap script may not include retry logic"
        fi
        
        return 0
    else
        log_error "✗ Bootstrap script not found"
        return 1
    fi
}

# Main test execution
log_info "Starting bootstrap workflow validation tests..."
echo ""

exit_code=0

# Run all tests
if ! test_database_validation_script; then
    exit_code=1
fi

if ! test_file_permission_validation_script; then
    exit_code=1
fi

if ! test_setup_env_script; then
    exit_code=1
fi

if ! test_nginx_generation_script; then
    exit_code=1
fi

if ! test_configuration_files; then
    exit_code=1
fi

if ! test_environment_file; then
    exit_code=1
fi

if ! test_prisma_configuration; then
    exit_code=1
fi

if ! test_package_json_scripts; then
    exit_code=1
fi

if ! test_bootstrap_script_structure; then
    exit_code=1
fi

if ! test_bootstrap_error_handling; then
    exit_code=1
fi

echo ""
if [ $exit_code -eq 0 ]; then
    log_success "All bootstrap workflow validation tests passed!"
    log_success "Bootstrap workflow is properly configured and ready for deployment"
else
    log_error "Bootstrap workflow validation tests failed!"
    log_error "Some components are missing or misconfigured"
fi

exit $exit_code