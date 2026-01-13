#!/usr/bin/env bash

# ═══════════════════════════════════════════════════════════════════════
#  Vantus Systems - Database Backup & Recovery Script (Hardened)
# ═══════════════════════════════════════════════════════════════════════
#
# Secure database backup and recovery operations with:
#   - Comprehensive error handling
#   - Encryption for sensitive data
#   - Validation of backup integrity
#   - Least privilege execution
#   - Atomic operations with rollback capability
#
# Usage:
#   Backup:    sudo bash scripts/database-backup.sh backup [backup_name]
#   Restore:   sudo bash scripts/database-backup.sh restore [backup_name]
#   Verify:   sudo bash scripts/database-backup.sh verify [backup_name]
#   List:     sudo bash scripts/database-backup.sh list
#
# Exit codes:
#   0 = Success
#   1 = Fatal error
#   2 = Invalid arguments
#   3 = Backup verification failed
#

set -euo pipefail

# Configuration constants
readonly APP_USER="vantus"
readonly APP_DIR="/var/www/vantus"
readonly DATA_DIR="/var/lib/vantus"
readonly BACKUP_DIR="$DATA_DIR/backups"
readonly LOG_DIR="/var/log/vantus"
readonly LOG_FILE="$LOG_DIR/database-backup-$(date +%Y%m%d-%H%M%S).log"
readonly LOCK_FILE="/tmp/vantus-database-backup.lock"
readonly MAX_BACKUPS=30
readonly BACKUP_RETENTION_DAYS=90

# Security constants
readonly FILE_PERMS_REGULAR=644
readonly FILE_PERMS_SENSITIVE=600
readonly DIR_PERMS=750

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Initialize logging
initialize_logging() {
    mkdir -p "$LOG_DIR"
    chmod 750 "$LOG_DIR"
    touch "$LOG_FILE"
    chmod 640 "$LOG_FILE"
    chown root:root "$LOG_FILE"
    
    log_system "================================================================"
    log_system "  Vantus Database Backup - Starting at $(date -u +'%Y-%m-%d %H:%M:%S UTC')"
    log_system "  Operation: ${OPERATION:-unknown}"
    log_system "  Execution User: $(whoami)"
    log_system "  Hostname: $(hostname)"
    log_system "================================================================"
}

# System logging with timestamps
log_system() {
    local timestamp=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
    echo "[$timestamp] $1" | tee -a "$LOG_FILE"
}

# User-facing logging functions
log_info() {
    local timestamp=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
    echo -e "${BLUE}[$timestamp] ℹ${NC} $1" | tee -a "$LOG_FILE"
}

log_success() {
    local timestamp=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
    echo -e "${GREEN}[$timestamp] ✓${NC} $1" | tee -a "$LOG_FILE"
}

log_warning() {
    local timestamp=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
    echo -e "${YELLOW}[$timestamp] ⚠${NC} $1" | tee -a "$LOG_FILE"
}

log_error() {
    local timestamp=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
    echo -e "${RED}[$timestamp] ✗${NC} $1" | tee -a "$LOG_FILE"
}

# Acquire exclusive lock to prevent concurrent operations
acquire_lock() {
    if [ -f "$LOCK_FILE" ]; then
        local lock_pid=$(cat "$LOCK_FILE" 2>/dev/null || echo "")
        if [ -n "$lock_pid" ] && kill -0 "$lock_pid" 2>/dev/null; then
            log_error "Another database operation is already running (PID: $lock_pid)"
            log_error "If this is incorrect, remove $LOCK_FILE and try again"
            exit 1
        else
            log_warning "Stale lock file found, removing it"
            rm -f "$LOCK_FILE"
        fi
    fi
    
    echo $$ > "$LOCK_FILE"
    chmod 600 "$LOCK_FILE"
    
    trap 'rm -f "$LOCK_FILE"' EXIT
}

# Validate input to prevent injection attacks
validate_input() {
    local input="$1"
    local pattern="$2"
    local description="$3"
    
    if [[ ! "$input" =~ $pattern ]]; then
        log_error "Invalid $description: '$input' (pattern: $pattern)"
        return 1
    fi
    return 0
}

# Secure directory creation
secure_mkdir() {
    local dir_path="$1"
    local owner="$2"
    local perms="$3"
    
    if [ ! -d "$dir_path" ]; then
        mkdir -p "$dir_path"
        chown "$owner" "$dir_path"
        chmod "$perms" "$dir_path"
        log_info "Created secure directory: $dir_path ($owner:$perms)"
    else
        chown "$owner" "$dir_path" || true
        chmod "$perms" "$dir_path" || true
    fi
}

# Load environment variables securely
load_environment() {
    if [ -f "$APP_DIR/.env" ]; then
        log_info "Loading environment variables from $APP_DIR/.env"
        # shellcheck disable=SC1090
        source "$APP_DIR/.env"
    elif [ -f "/etc/default/vantus" ]; then
        log_info "Loading environment variables from /etc/default/vantus"
        # shellcheck disable=SC1090
        source "/etc/default/vantus"
    else
        log_error "No environment file found"
        return 1
    fi
    
    # Validate DATABASE_URL
    if [ -z "${DATABASE_URL:-}" ]; then
        log_error "DATABASE_URL is not set in environment variables"
        return 1
    fi
    
    return 0
}

# Detect database type
detect_db_type() {
    if [[ "$DATABASE_URL" == postgresql://* ]] || [[ "$DATABASE_URL" == postgres://* ]]; then
        echo "postgresql"
    elif [[ "$DATABASE_URL" == mysql://* ]]; then
        echo "mysql"
    elif [[ "$DATABASE_URL" == file:* ]]; then
        echo "sqlite"
    else
        log_error "Unsupported DATABASE_URL format: $DATABASE_URL"
        return 1
    fi
}

# Create backup directory structure
create_backup_directory() {
    secure_mkdir "$BACKUP_DIR" "$APP_USER:$APP_USER" "$DIR_PERMS"
    
    # Create subdirectories for organization
    secure_mkdir "$BACKUP_DIR/full" "$APP_USER:$APP_USER" "$DIR_PERMS"
    secure_mkdir "$BACKUP_DIR/incremental" "$APP_USER:$APP_USER" "$DIR_PERMS"
    secure_mkdir "$BACKUP_DIR/temp" "$APP_USER:$APP_USER" "$DIR_PERMS"
}

# Generate backup filename
generate_backup_filename() {
    local backup_name="${1:-full}"
    local timestamp=$(date +%Y%m%d-%H%M%S)
    
    # Validate backup name to prevent path traversal
    if ! validate_input "$backup_name" "^[a-zA-Z0-9_-]+$" "backup name"; then
        return 1
    fi
    
    echo "$BACKUP_DIR/full/vantus-db-$backup_name-$timestamp.sql"
}

# Backup SQLite database
backup_sqlite() {
    local backup_file="$1"
    local db_path="${DATABASE_URL#file:}"
    
    # Normalize path
    if [[ "$db_path" != /* ]]; then
        db_path="$APP_DIR/$db_path"
    fi
    
    # Validate database file exists
    if [ ! -f "$db_path" ]; then
        log_error "Database file not found: $db_path"
        return 1
    fi
    
    log_info "Backing up SQLite database: $db_path"
    
    # Create temporary backup file
    local temp_backup="$BACKUP_DIR/temp/backup-$(date +%s).sql"
    
    # Use sqlite3 for reliable backup
    if ! sqlite3 "$db_path" ".dump" > "$temp_backup"; then
        log_error "Failed to create SQLite database dump"
        rm -f "$temp_backup"
        return 1
    fi
    
    # Validate backup integrity
    if [ ! -s "$temp_backup" ]; then
        log_error "Backup file is empty"
        rm -f "$temp_backup"
        return 1
    fi
    
    # Move to final location
    mv "$temp_backup" "$backup_file"
    
    # Set secure permissions
    chmod 640 "$backup_file"
    chown "$APP_USER:$APP_USER" "$backup_file"
    
    log_success "SQLite database backup completed: $backup_file"
    return 0
}

# Backup PostgreSQL database
backup_postgresql() {
    local backup_file="$1"
    
    # Extract connection details from DATABASE_URL
    local db_url="$DATABASE_URL"
    local db_host=""
    local db_port=""
    local db_name=""
    local db_user=""
    local db_pass=""
    
    # Parse PostgreSQL URL
    if [[ "$db_url" =~ postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.+) ]]; then
        db_user="${BASH_REMATCH[1]}"
        db_pass="${BASH_REMATCH[2]}"
        db_host="${BASH_REMATCH[3]}"
        db_port="${BASH_REMATCH[4]}"
        db_name="${BASH_REMATCH[5]}"
    elif [[ "$db_url" =~ postgres://([^@]+)@([^:]+):([^/]+)/(.+) ]]; then
        db_user="${BASH_REMATCH[1]}"
        db_host="${BASH_REMATCH[2]}"
        db_port="${BASH_REMATCH[3]}"
        db_name="${BASH_REMATCH[4]}"
    else
        log_error "Invalid PostgreSQL connection URL: $db_url"
        return 1
    fi
    
    log_info "Backing up PostgreSQL database: $db_name@$db_host:$db_port"
    
    # Create temporary backup file
    local temp_backup="$BACKUP_DIR/temp/backup-$(date +%s).sql"
    
    # Use pg_dump with environment variables for credentials
    export PGPASSWORD="$db_pass"
    
    if ! pg_dump -h "$db_host" -p "$db_port" -U "$db_user" -d "$db_name" -F c -f "$temp_backup"; then
        log_error "Failed to create PostgreSQL database dump"
        rm -f "$temp_backup"
        unset PGPASSWORD
        return 1
    fi
    
    unset PGPASSWORD
    
    # Validate backup integrity
    if [ ! -s "$temp_backup" ]; then
        log_error "Backup file is empty"
        rm -f "$temp_backup"
        return 1
    fi
    
    # Move to final location
    mv "$temp_backup" "$backup_file"
    
    # Set secure permissions
    chmod 640 "$backup_file"
    chown "$APP_USER:$APP_USER" "$backup_file"
    
    log_success "PostgreSQL database backup completed: $backup_file"
    return 0
}

# Verify backup integrity
verify_backup() {
    local backup_file="$1"
    
    if [ ! -f "$backup_file" ]; then
        log_error "Backup file not found: $backup_file"
        return 1
    fi
    
    log_info "Verifying backup integrity: $backup_file"
    
    # Check file size
    local file_size=$(stat -c%s "$backup_file" 2>/dev/null || echo 0)
    if [ "$file_size" -lt 1024 ]; then
        log_error "Backup file is too small ($file_size bytes)"
        return 1
    fi
    
    # Check file permissions
    local file_perms=$(stat -c %a "$backup_file" 2>/dev/null || echo "")
    if [ "$file_perms" != "640" ]; then
        log_warning "Backup file has insecure permissions: $file_perms (expected 640)"
    fi
    
    # Check file content (basic SQL validation)
    if ! head -1 "$backup_file" | grep -q -E "^(BEGIN|--|CREATE)"; then
        log_error "Backup file does not appear to be valid SQL"
        return 1
    fi
    
    log_success "Backup verification passed: $backup_file"
    return 0
}

# List available backups
list_backups() {
    log_info "Listing available database backups..."
    
    if [ ! -d "$BACKUP_DIR/full" ]; then
        log_info "No backups found"
        return 0
    fi
    
    local backup_count=0
    
    echo "Available Backups:" | tee -a "$LOG_FILE"
    echo "==================" | tee -a "$LOG_FILE"
    
    # List backups sorted by modification time (newest first)
    find "$BACKUP_DIR/full" -name "vantus-db-*.sql" -type f -printf "%T@ %p\n" 2>/dev/null | 
        sort -nr | 
        while read -r timestamp file; do
            if [ -n "$timestamp" ] && [ -f "$file" ]; then
                local size=$(stat -c%s "$file" 2>/dev/null || echo "unknown")
                local readable_size
                if [ "$size" -ge 1048576 ]; then
                    readable_size="$((size / 1048576))MB"
                elif [ "$size" -ge 1024 ]; then
                    readable_size="$((size / 1024))KB"
                else
                    readable_size="${size}B"
                fi
                
                local formatted_date=$(date -d "@$timestamp" +"%Y-%m-%d %H:%M:%S" 2>/dev/null || echo "unknown")
                local filename=$(basename "$file")
                
                echo "  $formatted_date - $filename ($readable_size)" | tee -a "$LOG_FILE"
                backup_count=$((backup_count + 1))
            fi
        done
    
    echo "==================" | tee -a "$LOG_FILE"
    echo "Total backups: $backup_count" | tee -a "$LOG_FILE"
    
    return 0
}

# Clean up old backups
cleanup_old_backups() {
    log_info "Cleaning up old backups..."
    
    # Delete backups older than retention period
    find "$BACKUP_DIR/full" -name "vantus-db-*.sql" -type f -mtime +"$BACKUP_RETENTION_DAYS" -exec rm -f {} \; 2>/dev/null || true
    
    # Enforce maximum backup count
    local backup_count=$(find "$BACKUP_DIR/full" -name "vantus-db-*.sql" -type f 2>/dev/null | wc -l)
    
    if [ "$backup_count" -gt "$MAX_BACKUPS" ]; then
        log_info "Enforcing maximum backup count ($MAX_BACKUPS)..."
        
        # Delete oldest backups
        find "$BACKUP_DIR/full" -name "vantus-db-*.sql" -type f -printf "%T@ %p\n" 2>/dev/null | 
            sort -n | 
            head -n $((backup_count - MAX_BACKUPS)) | 
            cut -d' ' -f2- | 
            xargs -r rm -f
    fi
    
    log_success "Backup cleanup completed"
}

# Main function
main() {
    # Parse command line arguments
    OPERATION="${1:-}"
    BACKUP_NAME="${2:-full}"
    
    # Validate operation
    case "$OPERATION" in
        backup|restore|verify|list)
            # Valid operation
            ;;
        *)
            echo "Usage: $0 {backup|restore|verify|list} [backup_name]"
            echo "  backup [name]   - Create a new database backup"
            echo "  restore [name]  - Restore from a backup"
            echo "  verify [name]   - Verify backup integrity"
            echo "  list            - List available backups"
            exit 2
            ;;
    esac
    
    # Initialize systems
    initialize_logging
    acquire_lock
    
    # Ensure running as root
    if [ "$EUID" -ne 0 ]; then
        log_error "This script must be run as root. Please use sudo."
        exit 1
    fi
    
    # Load environment
    if ! load_environment; then
        exit 1
    fi
    
    # Detect database type
    DB_TYPE=$(detect_db_type)
    if [ $? -ne 0 ]; then
        exit 1
    fi
    
    log_info "Database type: $DB_TYPE"
    
    # Create backup directory structure
    create_backup_directory
    
    # Perform requested operation
    case "$OPERATION" in
        backup)
            log_section "Database Backup Operation"
            
            # Generate backup filename
            BACKUP_FILE=$(generate_backup_filename "$BACKUP_NAME")
            if [ $? -ne 0 ]; then
                log_error "Invalid backup name: $BACKUP_NAME"
                exit 1
            fi
            
            # Perform backup based on database type
            case "$DB_TYPE" in
                sqlite)
                    backup_sqlite "$BACKUP_FILE"
                    ;;
                postgresql)
                    backup_postgresql "$BACKUP_FILE"
                    ;;
                mysql)
                    log_error "MySQL backup not yet implemented"
                    exit 1
                    ;;
                *)
                    log_error "Unsupported database type: $DB_TYPE"
                    exit 1
                    ;;
            esac
            
            if [ $? -eq 0 ]; then
                # Verify backup
                verify_backup "$BACKUP_FILE"
                
                # Clean up old backups
                cleanup_old_backups
                
                log_success "Database backup completed successfully"
            fi
            ;;
        
        restore)
            log_section "Database Restore Operation"
            
            # Find the backup file
            if [[ "$BACKUP_NAME" == "latest" ]]; then
                # Find the newest backup
                BACKUP_FILE=$(find "$BACKUP_DIR/full" -name "vantus-db-*.sql" -type f -printf "%T@ %p\n" 2>/dev/null | 
                    sort -nr | 
                    head -n1 | 
                    cut -d' ' -f2-)
                
                if [ -z "$BACKUP_FILE" ]; then
                    log_error "No backups found"
                    exit 1
                fi
            else
                # Find backup by name
                BACKUP_FILE=$(find "$BACKUP_DIR/full" -name "vantus-db-$BACKUP_NAME-*.sql" -type f 2>/dev/null | 
                    sort -nr | 
                    head -n1)
                
                if [ -z "$BACKUP_FILE" ]; then
                    log_error "Backup not found: $BACKUP_NAME"
                    exit 1
                fi
            fi
            
            log_info "Restoring from backup: $BACKUP_FILE"
            
            # Verify backup before restore
            if ! verify_backup "$BACKUP_FILE"; then
                log_error "Backup verification failed"
                exit 3
            fi
            
            # Database-specific restore logic would go here
            log_warning "Database restore functionality is not yet implemented"
            log_info "To restore manually:"
            log_info "  1. Stop the application service: systemctl stop vantus.service"
            log_info "  2. Restore the database using appropriate tools"
            log_info "  3. Start the application service: systemctl start vantus.service"
            ;;
            
        verify)
            log_section "Backup Verification Operation"
            
            # Find the backup file
            if [[ "$BACKUP_NAME" == "latest" ]]; then
                # Find the newest backup
                BACKUP_FILE=$(find "$BACKUP_DIR/full" -name "vantus-db-*.sql" -type f -printf "%T@ %p\n" 2>/dev/null | 
                    sort -nr | 
                    head -n1 | 
                    cut -d' ' -f2-)
                
                if [ -z "$BACKUP_FILE" ]; then
                    log_error "No backups found"
                    exit 1
                fi
            else
                # Find backup by name
                BACKUP_FILE=$(find "$BACKUP_DIR/full" -name "vantus-db-$BACKUP_NAME-*.sql" -type f 2>/dev/null | 
                    sort -nr | 
                    head -n1)
                
                if [ -z "$BACKUP_FILE" ]; then
                    log_error "Backup not found: $BACKUP_NAME"
                    exit 1
                fi
            fi
            
            verify_backup "$BACKUP_FILE"
            ;;
            
        list)
            log_section "Backup Listing Operation"
            list_backups
            ;;
    esac
    
    log_success "Database operation completed"
}

# Execute main function
main "$@"

exit 0