# CHK-CARE-020: Asset Inventory Checklist

**Document ID:** VS-CARE-CHK-020  
**Version:** 1.0.0  
**Effective Date:** 2026-02-21  
**Owner:** Delivery Lead  
**Status:** Active  
**Reading Level:** 8th Grade  
**Estimated Time:** 2-4 hours (initial), 30 min (monthly update)  
**Risk Rating:** Medium (unknown assets = unmanaged risk)

**Goal:** Maintain accurate, complete asset inventory that supports risk decisions, enables rapid incident response, and ensures smooth business transitions.

---

## 1. Scope Definition

- [ ] In-scope systems identified (what we're tracking)
- [ ] Out-of-scope systems noted (explicit exclusions)
- [ ] Asset categories defined:
  - Endpoints (laptops, desktops, mobile devices)
  - Servers (physical and virtual)
  - Network equipment (routers, switches, firewalls)
  - Storage systems (SAN, NAS, direct-attached)
  - SaaS services (cloud applications, subscriptions)
  - Critical applications (software essential to business)
- [ ] Level of detail confirmed (what attributes to track)
- [ ] Update frequency established (how often refreshed)

**Time Estimate:** 15-20 minutes  
**Owner:** Delivery Lead + Client  
**CMMC Alignment:** CM.2.1 (baseline configurations), CM.3.1 (change control)

---

## 2. Discovery Phase

- [ ] Network scanning completed (automated discovery tools)
- [ ] Manual walkthrough performed (physical inspection)
- [ ] Cloud/SaaS inventory gathered (admin portals reviewed)
- [ ] Shadow IT survey conducted ("What apps do you use?")
- [ ] Vendor records reviewed (purchase history)
- [ ] DHCP/DNS logs analyzed (connected devices)
- [ ] Agent-based discovery deployed (if available)

**Time Estimate:** 60-120 minutes (initial)  
**Vantus standard:** combining automated + manual discovery

---

## 3. Asset Data Collection

For each discovered asset, capture:

### Core Attributes (Required)
- [ ] Asset name/hostname (unique identifier)
- [ ] Asset type (category classification)
- [ ] Manufacturer/model (what it is)
- [ ] Serial number (unique hardware ID)
- [ ] Purchase date (when acquired)
- [ ] Warranty expiration (coverage end date)
- [ ] Location (physical or logical placement)
- [ ] Owner/primary user (who's responsible)
- [ ] Criticality rating (High/Medium/Low business impact)
- [ ] Environment (Production/Test/Development)

### Extended Attributes (Recommended)
- [ ] Operating system/version
- [ ] IP address/MAC address
- [ ] Specifications (CPU, RAM, storage)
- [ ] License information
- [ ] Support contract details
- [ ] Refresh/replacement date
- [ ] Business function supported
- [ ] Data classification handled

**Time Estimate:** 2-3 minutes per asset  
**Template:** TPL-CARE-010 (Inventory Snapshot)

---

## 4. Dependency Mapping

- [ ] Internet dependencies documented (ISP, connections)
- [ ] Domain dependencies noted (DNS providers)
- [ ] Identity dependencies mapped (authentication systems)
- [ ] Backup dependencies identified (where backups go)
- [ ] Critical SaaS dependencies listed (essential cloud services)
- [ ] Upstream/downstream relationships noted (what relies on what)
- [ ] Single points of failure highlighted (risk awareness)

**Time Estimate:** 30-45 minutes  
**Critical for:** Incident response, disaster recovery planning

---

## 5. Validation & Verification

- [ ] Unknown ownership resolved (every asset has an owner)
- [ ] Duplicate entries removed (one record per asset)
- [ ] Inactive assets identified (not used, candidate for removal)
- [ ] Missing assets investigated (expected but not found)
- [ ] Data accuracy spot-checked (sample verification)
- [ ] Client review completed (they confirm accuracy)
- [ ] Discrepancies documented (issues to resolve)

**Time Estimate:** 30-45 minutes  
**CMMC Alignment:** SA.1.1 (supply chain), SA.2.1 (supply chain risk)

---

## 6. Documentation Creation

- [ ] Inventory snapshot created (TPL-CARE-010 completed)
- [ ] Network diagram updated (visual representation)
- [ ] Asset register formatted (consistent structure)
- [ ] Version control applied (change tracking)
- [ ] Access permissions set (who can view/edit)
- [ ] Location documented (where inventory files live)
- [ ] Backup copy made (protected from loss)

**Time Estimate:** 30-45 minutes

---

## 7. Ongoing Maintenance

### Monthly Activities
- [ ] New assets added (within 5 business days of deployment)
- [ ] Decommissioned assets removed (marked as retired)
- [ ] Ownership changes updated (reassignments recorded)
- [ ] New discoveries investigated (unknown devices identified)
- [ ] Accuracy spot-checks performed (sample verification)

### Quarterly Activities (Advanced+)
- [ ] Comprehensive review (all entries verified)
- [ ] Lifecycle analysis (aging assets flagged)
- [ ] Dependency refresh (relationships updated)
- [ ] Client confirmation (they verify current state)
- [ ] Documentation standards check (format consistency)

**Time Estimate:** 30 minutes monthly, 2-3 hours quarterly

---

## 8. Integration with Other Processes

- [ ] **Change Management:** Updates triggered by changes (SOP-CARE-017)
- [ ] **Monitoring:** Inventory feeds monitoring scope (SOP-CARE-011)
- [ ] **Backup:** Inventory drives backup coverage (SOP-CARE-013)
- [ ] **Patching:** Inventory scope for patch management (SOP-CARE-015)
- [ ] **Security:** Inventory scope for vulnerability scanning
- [ ] **Reporting:** Inventory excerpt in quarterly review (SOP-CARE-021)
- [ ] **Offboarding:** Inventory transferred during transition (SOP-CARE-031)

---

## Asset Criticality Definitions

| Rating | Definition | Examples |
|--------|------------|----------|
| **High** | Business stops if unavailable | Domain controller, email server, core database |
| **Medium** | Significant impact, workarounds exist | File server, application server, network gear |
| **Low** | Minimal impact, easily replaced | Test systems, spare equipment, non-essential |

---

## Inventory Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Completeness | 98%+ | Discovered vs. expected |
| Accuracy | 95%+ | Sample verification |
| Timeliness | 5 days | New assets added within |
| Freshness | 30 days | Last full review |

---

## Success Criteria

| Criterion | Target | Verification |
|-----------|--------|--------------|
| Completeness | 98%+ | Discovery scan vs. inventory |
| Accuracy | 95%+ | Sample audit |
| Update timeliness | 100% within 5 days | Change correlation |
| Client confidence | 90%+ | Feedback survey |
| Incident utility | Used in 100% incidents | Post-incident review |

---

## Common Inventory Gaps to Watch

- **Shadow IT:** Cloud apps users signed up for without IT
- **Personal devices:** BYOD not properly recorded
- **Test systems:** Forgotten dev/test environments
- **Network gear:** Small switches, access points overlooked
- **IoT devices:** Printers, cameras, sensors forgotten
- **Virtual machines:** Ephemeral VMs not tracked
- **Remote equipment:** Home office gear not inventoried

---

## Related Documents

- **SOP:** SOP-CARE-010 (Asset Inventory)
- **Template:** TPL-CARE-010 (Inventory Snapshot)
- **Checklist:** CHK-CARE-017 (Lifecycle Planning - uses inventory)
- **Checklist:** CHK-CARE-016 (Hardware Procurement - adds to inventory)
- **Checklist:** CHK-CARE-006 (Offboarding - transfers inventory)

---

*Last Updated: 2026-02-21 | Version 1.0.0 | Questions? Contact your Delivery Lead*
