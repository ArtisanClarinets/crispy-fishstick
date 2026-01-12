# Vantus Systems - Database Management Documentation

## Overview

This directory contains secure, production-grade database management scripts for Vantus Systems. These scripts handle database initialization, migrations, seeding, backup, and recovery operations with comprehensive security measures.

## Scripts

### 1. Database Initialization & Migration (bootstrap-ubuntu22.sh)

**Location**: Integrated into the main bootstrap script (`scripts/bootstrap-ubuntu22.sh`)

**Features**:
- ✅ **Secure Database Directory Creation**: Creates database directories with proper permissions (750)
- ✅ **Database Type Detection**: Automatically detects SQLite, PostgreSQL, or MySQL
- ✅ **Comprehensive Validation**: Validates database connectivity and Prisma schema
- ✅ **Migration Management**: Applies Prisma migrations with retry logic
- ✅ **Secure Seeding**: Seeds database with admin user and roles (requires ADMIN_BOOTSTRAP_EMAIL/PASSWORD)
- ✅ **Schema Validation**: Validates final schema integrity
- ✅ **Database Security Hardening**: Sets secure file permissions (640) on database files
- ✅ **Environment Validation**: Validates required environment variables
- ✅ **Error Handling**: Comprehensive error handling with retry logic

**Usage**: 
The database initialization is automatically performed during the bootstrap process. No separate invocation is needed.

### 2. Database Backup & Recovery (database-backup.sh)

**Location**: `scripts/database-backup.sh`

**Features**:
- ✅ **Comprehensive Backup Operations**: Full database backups with integrity verification
- ✅ **Multiple Database Support**: SQLite, PostgreSQL, MySQL
- ✅ **Secure Storage**: Backups stored with restricted permissions (640)
- ✅ **Backup Rotation**: Automatic cleanup of old backups (90-day retention)
- ✅ **Backup Verification**: Validates backup integrity before restore operations
- ✅ **Atomic Operations**: Prevents concurrent operations with locking
- ✅ **Least Privilege**: Runs operations as application user
- ✅ **Input Validation**: Prevents path traversal and injection attacks
- ✅ **Comprehensive Logging**: Detailed audit trail of all operations

**Usage**:

```bash
# Create a backup (named backup)
sudo bash scripts/database-backup.sh backup pre-deployment

# Create a backup with default name
sudo bash scripts/database-backup.sh backup

# List available backups
sudo bash scripts/database-backup.sh list

# Verify a specific backup
sudo bash scripts/database-backup.sh verify pre-deployment

# Verify the latest backup
sudo bash scripts/database-backup.sh verify latest

# Restore from a specific backup
sudo bash scripts/database-backup.sh restore pre-deployment

# Restore from the latest backup
sudo bash scripts/database-backup.sh restore latest
```

**Backup Location**: `/var/lib/vantus/backups/full/`

**Retention Policy**:
- Maximum backups: 30
- Retention period: 90 days
- Old backups are automatically cleaned up

## Database Configuration

### Environment Variables

The database configuration is managed through environment variables in `.env`:

```env
# SQLite (default)
DATABASE_URL="file:/var/lib/vantus/prod.db"

# PostgreSQL (alternative)
# DATABASE_URL="postgresql://user:password@localhost:5432/vantus"

# MySQL (alternative)
# DATABASE_URL="mysql://user:password@localhost:3306/vantus"
```

### Prisma Configuration

**Schema**: `prisma/schema.prisma`
- Defines database models, relationships, and constraints
- Uses SQLite as the default provider
- Supports PostgreSQL and MySQL

**Migrations**: `prisma/migrations/`
- Automatic migration generation and application
- Migration files include SQL and metadata
- Supports rollback scenarios

**Seeding**: `prisma/seed.ts`
- Creates initial admin user
- Sets up default roles and permissions
- Creates default tenant
- Requires `ADMIN_BOOTSTRAP_EMAIL` and `ADMIN_BOOTSTRAP_PASSWORD`

## Security Measures

### Database File Security

1. **File Permissions**: Database files are created with `640` permissions
2. **Directory Permissions**: Database directories use `750` permissions
3. **Ownership**: Files are owned by the application user (`vantus:vantus`)
4. **Backup Encryption**: Backups are stored with restricted access

### Operational Security

1. **Input Validation**: All inputs are validated to prevent injection attacks
2. **Concurrency Control**: Lock files prevent concurrent database operations
3. **Least Privilege**: Operations run as the application user, not root
4. **Environment Validation**: Required variables are validated before operations
5. **Error Handling**: Comprehensive error handling with retry logic

### Data Protection

1. **Backup Integrity**: Backups are verified before restore operations
2. **Secure Storage**: Backups stored in protected directory structure
3. **Retention Policies**: Automatic cleanup of old backups
4. **Audit Logging**: All operations are logged with timestamps

## Database Schema

The database schema includes comprehensive models for:

- **Authentication**: Users, sessions, password history, MFA
- **Authorization**: Roles, role assignments, RBAC
- **Content Management**: Content, media assets
- **Business Entities**: Tenants, projects, contracts, invoices
- **Operational Data**: Audit logs, security logs, incidents
- **System Data**: Rate limiting, idempotency keys, webhooks

## Migration Strategy

### Development Workflow

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

### Production Deployment

1. **Generate Migration**: Create migration in development
2. **Test Migration**: Test migration in staging environment
3. **Apply Migration**: Use `prisma migrate deploy` in production
4. **Verify Schema**: Run `prisma validate` to ensure integrity
5. **Backup Database**: Create backup before and after migration

### Rollback Strategy

1. **Identify Issue**: Determine the problematic migration
2. **Restore Backup**: Use `database-backup.sh restore` to revert
3. **Fix Migration**: Correct the migration issues
4. **Reapply Migration**: Deploy the fixed migration
5. **Verify Data**: Ensure data integrity after rollback

## Troubleshooting

### Common Issues

**Database connection failed**:
- Verify `DATABASE_URL` is correctly set
- Check database service is running
- Validate file permissions for SQLite
- Check network connectivity for PostgreSQL/MySQL

**Migration failed**:
- Check migration SQL for syntax errors
- Verify database schema compatibility
- Review Prisma version compatibility
- Check for breaking changes in schema

**Backup failed**:
- Verify sufficient disk space
- Check file permissions on backup directory
- Ensure database is accessible
- Validate database credentials

### Debugging Commands

```bash
# Check database connectivity
sqlite3 /var/lib/vantus/prod.db "SELECT 1;"

# Validate Prisma schema
npx prisma validate

# Check migration status
npx prisma migrate status

# View database logs
journalctl -u vantus.service -n 50

# Check backup directory
ls -la /var/lib/vantus/backups/full/
```

## Best Practices

### Database Management

1. **Regular Backups**: Schedule automated backups
2. **Test Restores**: Periodically test backup restoration
3. **Monitor Growth**: Track database size and performance
4. **Index Optimization**: Add indexes for frequently queried fields
5. **Connection Pooling**: Configure appropriate connection limits

### Security

1. **Rotate Credentials**: Change database passwords regularly
2. **Encrypt Backups**: Consider encrypting sensitive backups
3. **Audit Access**: Monitor database access logs
4. **Principle of Least Privilege**: Limit database user permissions
5. **Network Security**: Restrict database access to trusted networks

### Performance

1. **Query Optimization**: Analyze and optimize slow queries
2. **Caching Strategy**: Implement caching for frequent queries
3. **Database Maintenance**: Regular vacuum/optimize operations
4. **Monitor Connections**: Track connection usage and timeouts
5. **Scale Appropriately**: Consider read replicas for high load

## Integration with Bootstrap Process

The database initialization is fully integrated into the bootstrap process:

1. **Environment Loading**: Loads `.env` configuration
2. **Database Detection**: Identifies database type
3. **Directory Creation**: Creates secure database directories
4. **Validation**: Validates database connectivity
5. **Migration**: Applies pending migrations
6. **Seeding**: Creates initial data (if enabled)
7. **Security Hardening**: Sets secure file permissions
8. **Final Validation**: Ensures schema integrity

## Monitoring and Alerts

Consider implementing monitoring for:

- Database connection errors
- Migration failures
- Backup failures
- Disk space warnings
- Query performance issues
- Connection pool exhaustion

## Disaster Recovery

### Recovery Procedures

1. **Identify Failure**: Determine the scope of data loss
2. **Select Backup**: Choose the most recent valid backup
3. **Restore Data**: Use the restore procedure
4. **Validate Integrity**: Verify data consistency
5. **Reapply Changes**: Restore any post-backup changes
6. **Monitor System**: Watch for issues after recovery

### Recovery Time Objectives

- **Critical Data**: < 1 hour recovery
- **Important Data**: < 4 hours recovery  
- **Non-critical Data**: < 24 hours recovery

## Future Enhancements

1. **Automated Backup Scheduling**: Cron-based backup automation
2. **Encrypted Backups**: GPG encryption for sensitive data
3. **Remote Backup Storage**: Cloud storage integration
4. **Point-in-Time Recovery**: Transaction log-based recovery
5. **Database Monitoring**: Performance metrics and alerts
6. **Migration Testing**: Automated migration validation

## Support

For database-related issues:

1. Check logs: `/var/log/vantus/`
2. Review backup files: `/var/lib/vantus/backups/`
3. Verify environment: `.env` and `/etc/default/vantus`
4. Consult Prisma documentation: https://www.prisma.io/docs/

## License

These scripts are part of Vantus Systems and are subject to the project's license terms. Unauthorized modification or distribution is prohibited.