import os
import sys

# Since I cannot easily run a browser in this headless environment to "verify" the DOM dynamically,
# I will verify the static content of the files.
# This acts as a sanity check that my changes are persisted.

def check_file_content(filepath, search_strings):
    print(f"Checking {filepath}...")
    if not os.path.exists(filepath):
        print(f"FAILED: {filepath} does not exist.")
        return False

    with open(filepath, 'r') as f:
        content = f.read()

    all_found = True
    for s in search_strings:
        if s not in content:
            # Try html entity variations if needed, but basic check first
            print(f"  MISSING: '{s}'")
            all_found = False
        else:
            print(f"  FOUND: '{s}'")

    return all_found

checks = [
    {
        "path": "app/(site)/page.tsx",
        "strings": [
            "Ownership. Control. Peace of Mind.",
            "Enterprise-grade web apps that you actually",
            "We build the engine. You drive the car.",
            "DashboardPreview",
            "RiskCards",
            "LocalBusinessImpact"
        ]
    },
    {
        "path": "app/(site)/platform/page.tsx",
        "strings": [
            "The Owner&apos;s Dashboard",
            "InteractiveToggle",
            "Content Management",
            "Business Logic"
        ]
    },
    {
        "path": "app/(site)/academy/page.tsx",
        "strings": [
            "Education for Owners",
            "SpeedMeter",
            "Compliance & Safety"
        ]
    },
    {
        "path": "app/(site)/services/page.tsx",
        "strings": [
            "The Business OS",
            "Audit & Rescue",
            "Custom Next.js Website"
        ]
    },
    {
        "path": "app/(site)/process/page.tsx",
        "strings": [
            "The Owner&apos;s View",
            "1. Discovery",
            "4. Handoff"
        ]
    },
    {
        "path": "app/(site)/trust/page.tsx",
        "strings": [
            "Trust Center",
            "What You Own",
            "BeforeAfterComparison"
        ]
    }
]

success = True
for check in checks:
    if not check_file_content(check["path"], check["strings"]):
        success = False

if success:
    print("\nSUCCESS: All SMB content verified in source.")
    sys.exit(0)
else:
    print("\nFAILURE: Some SMB content is missing.")
    sys.exit(1)
