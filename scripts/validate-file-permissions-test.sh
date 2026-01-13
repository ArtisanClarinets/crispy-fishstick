#!/bin/bash

# Vantus Systems - File Permission Validation Test Script
# This script tests the file permission validation functionality

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

# Test setup
TEST_DIR="/tmp/vantus-permission-test"
TEST_ENV_FILE="$TEST_DIR/.env"
TEST_CONFIG_FILE="$TEST_DIR/config.conf"

cleanup() {
    rm -rf "$TEST_DIR"
}

# Create test directory and files
setup_test_files() {
    mkdir -p "$TEST_DIR"
    echo "DATABASE_URL=file:./test.db" > "$TEST_ENV_FILE"
    echo "SECRET_KEY=test123" > "$TEST_CONFIG_FILE"
}

test_correct_permissions() {
    log_info "Testing correct permissions (600) and ownership..."
    
    # Set correct permissions and ownership
    chmod 600 "$TEST_ENV_FILE" "$TEST_CONFIG_FILE"
    chown $USER:$USER "$TEST_ENV_FILE" "$TEST_CONFIG_FILE"
    
    # Create a temporary validation script that uses our test files
    cat > /tmp/test-validate.sh << 'EOF'
#!/bin/bash
APP_USER="$USER"
APP_GROUP="$USER"
APP_DIR="/tmp/vantus-permission-test"
ENV_FILE="/tmp/vantus-permission-test/config.conf"

validate_file() {
    local file_path="$1"
    local expected_owner="$2"
    local expected_permissions="$3"
    local file_name="$4"
    
    if [ ! -f "$file_path" ]; then
        echo "File $file_name not found at $file_path"
        return 1
    fi
    
    # Check ownership
    local actual_owner=$(stat -c %u:%g "$file_path")
    local expected_owner_ids=$(id -u "$expected_owner"):$(id -g "$expected_owner")
    
    if [ "$actual_owner" != "$expected_owner_ids" ]; then
        echo "Incorrect ownership for $file_name"
        return 1
    fi
    
    # Check permissions
    local actual_permissions=$(stat -c %a "$file_path")
    if [ "$actual_permissions" != "$expected_permissions" ]; then
        echo "Incorrect permissions for $file_name"
        return 1
    fi
    
    echo "✓ $file_name has correct permissions and ownership"
    return 0
}

# Test both files
exit_code=0
if ! validate_file "$APP_DIR/.env" "$APP_USER" "600" "$APP_DIR/.env"; then
    exit_code=1
fi

if ! validate_file "$ENV_FILE" "$APP_USER" "600" "$ENV_FILE"; then
    exit_code=1
fi

exit $exit_code
EOF
    
    chmod +x /tmp/test-validate.sh
    
    # Run the test
    if /tmp/test-validate.sh; then
        log_success "Correct permissions test passed"
        return 0
    else
        log_error "Correct permissions test failed"
        return 1
    fi
}

test_incorrect_permissions() {
    log_info "Testing incorrect permissions (644 instead of 600)..."
    
    # Set incorrect permissions
    chmod 644 "$TEST_ENV_FILE"
    
    # Create a test script
    cat > /tmp/test-validate-incorrect.sh << 'EOF'
#!/bin/bash
APP_USER="$USER"
APP_DIR="/tmp/vantus-permission-test"

validate_file() {
    local file_path="$1"
    local expected_owner="$2"
    local expected_permissions="$3"
    local file_name="$4"
    
    if [ ! -f "$file_path" ]; then
        echo "File $file_name not found at $file_path"
        return 1
    fi
    
    # Check permissions
    local actual_permissions=$(stat -c %a "$file_path")
    if [ "$actual_permissions" != "$expected_permissions" ]; then
        echo "Incorrect permissions for $file_name: expected $expected_permissions but got $actual_permissions"
        return 1
    fi
    
    echo "✓ $file_name has correct permissions"
    return 0
}

# Test with incorrect permissions
exit_code=0
if ! validate_file "$APP_DIR/.env" "$APP_USER" "600" "$APP_DIR/.env"; then
    exit_code=1
fi

exit $exit_code
EOF
    
    chmod +x /tmp/test-validate-incorrect.sh
    
    # Run the test - should fail
    if /tmp/test-validate-incorrect.sh; then
        log_error "Incorrect permissions test should have failed but passed"
        return 1
    else
        log_success "Incorrect permissions test correctly detected permission issue"
        return 0
    fi
}

test_missing_file() {
    log_info "Testing missing file scenario..."
    
    # Remove the test file
    rm -f "$TEST_ENV_FILE"
    
    # Create a test script
    cat > /tmp/test-validate-missing.sh << 'EOF'
#!/bin/bash
APP_USER="$USER"
APP_DIR="/tmp/vantus-permission-test"

validate_file() {
    local file_path="$1"
    local expected_owner="$2"
    local expected_permissions="$3"
    local file_name="$4"
    
    if [ ! -f "$file_path" ]; then
        echo "File $file_name not found at $file_path"
        return 1
    fi
    
    echo "✓ $file_name exists"
    return 0
}

# Test with missing file
exit_code=0
if ! validate_file "$APP_DIR/.env" "$APP_USER" "600" "$APP_DIR/.env"; then
    exit_code=1
fi

exit $exit_code
EOF
    
    chmod +x /tmp/test-validate-missing.sh
    
    # Run the test - should fail
    if /tmp/test-validate-missing.sh; then
        log_error "Missing file test should have failed but passed"
        return 1
    else
        log_success "Missing file test correctly detected missing file"
        return 0
    fi
}

# Main test execution
log_info "Starting file permission validation tests..."
echo ""

setup_test_files

test_correct_permissions
test_incorrect_permissions
test_missing_file

echo ""
log_success "All file permission validation tests completed!"

cleanup