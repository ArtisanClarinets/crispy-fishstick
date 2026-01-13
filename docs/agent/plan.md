# Bootstrap Script Fix Plan

## Overview
Fix the bootstrap-ubuntu22.sh script to ensure zero-error execution with proper security, reliability, and functionality.

## Milestones

### M-001: Analysis and Grounding (DONE)
- [x] Read and analyze bootstrap-ubuntu22.sh
- [x] Identify specific errors and issues
- [x] Create grounding files (agent_state.yaml, plan.md, requirements.md)
- [x] Document constraints and assumptions

### M-002: Fix Syntax Errors
- [x] Fix 'secure_install_packages: command not found' error (line 840)
- [x] Fix '[: too many arguments' errors (lines 675, 696)
- [x] Verify all function definitions and calls

### M-003: Update Environment Configuration
- [ ] Add interactive AWS prompt logic
- [ ] Complete Redis setup and configuration
- [ ] Update .env generation with all required variables
- [ ] Ensure proper file permissions (600, vantus:vantus ownership)

### M-004: Fix Nginx Configuration Logic
- [ ] Remove any /etc/nginx/* modifications
- [ ] Generate config at config/nginx/vantus-web-app.conf
- [ ] Integrate nginx config into bootstrap process
- [ ] Update documentation

### M-005: Complete Redis Integration
- [ ] Install and configure Redis server
- [ ] Set Redis to listen on localhost only
- [ ] Configure max memory and eviction policy
- [ ] Enable and start Redis service
- [ ] Verify Redis connectivity
- [ ] Update .env with REDIS_URL

### M-006: Update Documentation
- [ ] Update README with new flows and permissions
- [ ] Update inline comments in bootstrap script
- [ ] Update associated docs to reflect changes
- [ ] Document rollback procedures

### M-007: Verification and Testing
- [ ] Run verification commands
- [ ] Test script execution in safe environment
- [ ] Validate all security requirements
- [ ] Generate final verification report

## Dependencies
- M-002 must complete before M-003, M-004, M-005
- M-003, M-004, M-005 can run in parallel
- M-006 depends on M-003, M-004, M-005
- M-007 depends on all previous milestones

## Risk Mitigation
- All changes are minimal and reversible
- Script maintains idempotency
- Security controls are preserved or enhanced
- Comprehensive logging for troubleshooting

## Success Criteria
- Script executes without syntax errors
- All required packages install successfully
- Environment file generated with correct permissions
- Redis configured and running if requested
- Nginx config generated in correct location
- Documentation updated and accurate
- Verification commands pass