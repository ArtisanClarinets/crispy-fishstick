from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # 1. Verify 404 Page
            print("Verifying 404 page...")
            page.goto("http://localhost:3000/non-existent-page", wait_until="networkidle")
            page.screenshot(path="verification/404_page.png")

            # 2. Verify Contact Form Toast
            print("Verifying Contact Form Toast...")
            page.goto("http://localhost:3000/contact", wait_until="networkidle")

            # Fill out form step 1
            page.fill("input[id='name']", "Test User")
            page.fill("input[id='role']", "Tester")
            page.click("button:has-text('Next Step')")

            # Step 2
            page.fill("textarea[id='message']", "This is a test message for verification.")
            page.click("button:has-text('Next Step')")

            # Step 3
            page.fill("input[id='email']", "test@example.com")
            page.click("button:has-text('Send Request')")

            # Wait for Toast
            page.wait_for_selector("div[role='status']", timeout=5000)
            page.screenshot(path="verification/contact_toast.png")
            print("Screenshots captured.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_frontend()
