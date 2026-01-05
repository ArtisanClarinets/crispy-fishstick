from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Verify Trust Center Link
        page.locator("text=Trust Center").click()
        page.wait_for_url("**/trust")
        page.screenshot(path="verification_trust.png")
        print("Verified Trust Center page")

        # Go back to home
        page.goto("http://localhost:3000")

        # Verify Build Plan Module
        page.locator("text=The Build Plan").wait_for(state="visible")
        page.screenshot(path="verification_home_build_plan.png")
        print("Verified Build Plan Module on Home")

        # Verify Audit Modal
        page.get_by_text("Get a 60-second audit").click()
        page.get_by_role("dialog").wait_for(state="visible")
        page.screenshot(path="verification_audit_modal.png")
        print("Verified Audit Modal")

        browser.close()

if __name__ == "__main__":
    verify_changes()
