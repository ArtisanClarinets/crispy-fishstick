#!/bin/bash

# Vantus Systems - Port Configuration Test Script
# This script verifies that all components consistently use port 3005

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

# Test port configuration in .env file
test_env_file() {
    log_info "Testing .env file port configuration..."
    
    if [ -f ".env" ]; then
        local port=$(grep -E '^PORT=' .env | cut -d '=' -f2 | tr -d '"' | tr -d "'")
        if [ "$port" = "3005" ]; then
            log_success "✓ .env file uses port 3005"
            return 0
        else
            log_error "✗ .env file uses port $port instead of 3005"
            return 1
        fi
    else
        log_warning "⚠ .env file not found"
        return 1
    fi
}

# Test port configuration in Nginx config
test_nginx_config() {
    log_info "Testing Nginx configuration port usage..."
    
    local nginx_conf="config/nginx/nginx.conf"
    if [ -f "$nginx_conf" ]; then
        # Check for proxy_pass directives using port 3005
        local proxy_count=$(grep -c 'proxy_pass http://127.0.0.1:3005' "$nginx_conf")
        if [ "$proxy_count" -gt 0 ]; then
            log_success "✓ Nginx configuration uses port 3005 in $proxy_count proxy_pass directives"
            return 0
        else
            log_error "✗ Nginx configuration does not use port 3005"
            return 1
        fi
    else
        log_warning "⚠ Nginx configuration file not found"
        return 1
    fi
}

# Test port configuration in Supervisor config
test_supervisor_config() {
    log_info "Testing Supervisor configuration port usage..."
    
    local supervisor_conf="config/supervisor/vantus.conf"
    if [ -f "$supervisor_conf" ]; then
        # Check for PORT environment variable
        if grep -q 'PORT="3005"' "$supervisor_conf"; then
            log_success "✓ Supervisor configuration uses port 3005"
            return 0
        else
            log_error "✗ Supervisor configuration does not use port 3005"
            return 1
        fi
    else
        log_warning "⚠ Supervisor configuration file not found"
        return 1
    fi
}

# Test port configuration in Systemd service
test_systemd_config() {
    log_info "Testing Systemd service configuration port usage..."
    
    local systemd_conf="config/systemd/vantus.service"
    if [ -f "$systemd_conf" ]; then
        # Check for PORT environment variable
        if grep -q 'PORT=3005' "$systemd_conf"; then
            log_success "✓ Systemd service configuration uses port 3005"
            return 0
        else
            log_error "✗ Systemd service configuration does not use port 3005"
            return 1
        fi
    else
        log_warning "⚠ Systemd service configuration file not found"
        return 1
    fi
}

# Test port configuration in edge device configs
test_edge_device_configs() {
    log_info "Testing edge device configuration port usage..."
    
    local edge_dir="config/nginx/edge_device"
    if [ -d "$edge_dir" ]; then
        # Check for port 3005 in edge device configs
        local edge_count=$(grep -r "3005" "$edge_dir" | wc -l)
        if [ "$edge_count" -gt 0 ]; then
            log_success "✓ Edge device configurations use port 3005"
            return 0
        else
            log_warning "⚠ No port 3005 found in edge device configurations"
            return 0  # This is not necessarily an error
        fi
    else
        log_warning "⚠ Edge device configuration directory not found"
        return 0  # This is not necessarily an error
    fi
}

# Main test execution
log_info "Starting port configuration consistency tests..."
echo ""

exit_code=0

# Run all tests
if ! test_env_file; then
    exit_code=1
fi

if ! test_nginx_config; then
    exit_code=1
fi

if ! test_supervisor_config; then
    exit_code=1
fi

if ! test_systemd_config; then
    exit_code=1
fi

if ! test_edge_device_configs; then
    exit_code=1
fi

echo ""
if [ $exit_code -eq 0 ]; then
    log_success "All port configuration tests passed!"
    log_success "All components consistently use port 3005"
else
    log_error "Port configuration tests failed!"
    log_error "Some components are not using port 3005 consistently"
fi

exit $exit_code