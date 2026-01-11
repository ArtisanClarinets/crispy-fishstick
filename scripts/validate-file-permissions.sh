#!/bin/bash

# Vantus Systems - File Permission Validator
# This script validates that sensitive files have proper ownership and permissions

set -e

# Configuration
APP_USER="vantus"
APP_GROUP="vantus"
APP_DIR="/var/www/vantus"
ENV_FILE="/etc/default/vantus"

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

# Function to validate file permissions and ownership
validate_file() {
    local file_path="$1"
    local expected_owner="$2"
    local expected_permissions="$3"
    local file_name="$4"
    
    if [ ! -f "$file_path" ]; then
        log_error "File $file_name not found at $file_path"
        return 1
    fi
    
    # Check ownership
    local actual_owner=$(stat -c %u:%g "$file_path")
    local expected_owner_ids=$(id -u "$expected_owner"):$(id -g "$expected_owner")
    
    if [ "$actual_owner" != "$expected_owner_ids" ]; then
        log_error "Incorrect ownership for $file_name: expected $expected_owner but got $(getent passwd $(echo $actual_owner | cut -d: -f1) | cut -d: -f1)"
        return 1
    fi
    
    # Check permissions
    local actual_permissions=$(stat -c %a "$file_path")
    if [ "$actual_permissions" != "$expected_permissions" ]; then
        log_error "Incorrect permissions for $file_name: expected $expected_permissions but got $actual_permissions"
        return 1
    fi
    
    log_success "✓ $file_name has correct permissions ($expected_permissions) and ownership ($expected_owner)"
    return 0
}

# Main validation
log_info "Starting file permission validation..."

exit_code=0

# Validate /var/www/vantus/.env
if [ -f "$APP_DIR/.env" ]; then
    log_info "Validating $APP_DIR/.env..."
    if ! validate_file "$APP_DIR/.env" "$APP_USER" "600" "$APP_DIR/.env"; then
        exit_code=1
    fi
else
    log_warning "$APP_DIR/.env not found, skipping validation"
fi

# Validate /etc/default/vantus
if [ -f "$ENV_FILE" ]; then
    log_info "Validating $ENV_FILE..."
    if ! validate_file "$ENV_FILE" "$APP_USER" "600" "$ENV_FILE"; then
        exit_code=1
    fi
else
    log_warning "$ENV_FILE not found, skipping validation"
fi

if [ $exit_code -eq 0 ]; then
    log_success "All file permission validations passed!"
else
    log_error "File permission validation failed!"
    log_info "Please run the bootstrap script to fix permissions or manually set them:"
    log_info "  chown $APP_USER:$APP_GROUP $APP_DIR/.env && chmod 600 $APP_DIR/.env"
    log_info "  chown $APP_USER:$APP_GROUP $ENV_FILE && chmod 600 $ENV_FILE"
fi

exit $exit_code