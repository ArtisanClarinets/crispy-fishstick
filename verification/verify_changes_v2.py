from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # 1. Verify 404 Page
            print("Verifying 404 page...")
            page.goto("http://localhost:3000/non-existent-page")
            # Wait for the "404" text to be visible
            page.wait_for_selector("text=404", timeout=10000)
            page.screenshot(path="verification/404_page.png")
            print("404 Verified.")

            # 2. Verify Contact Form Toast
            print("Verifying Contact Form Toast...")
            page.goto("http://localhost:3000/contact")

            # Fill out form step 1
            # Wait for animation
            page.wait_for_selector("input[id='name']", state="visible")
            page.fill("input[id='name']", "Test User")
            page.fill("input[id='role']", "Tester")
            page.click("button:has-text('Next Step')")

            # Step 2
            # Wait for animation
            page.wait_for_selector("textarea[id='message']", state="visible")
            page.fill("textarea[id='message']", "This is a test message for verification.")
            page.click("button:has-text('Next Step')")

            # Step 3
            # Wait for animation
            page.wait_for_selector("input[id='email']", state="visible")
            page.fill("input[id='email']", "test@example.com")

            # Click send
            page.click("button:has-text('Send Request')")

            # Wait for Toast (role="status" or class containing 'toast')
            # The toast title "Message Sent" should appear
            page.wait_for_selector("text=Message Sent", timeout=10000)
            page.screenshot(path="verification/contact_toast.png")
            print("Contact Toast Verified.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_frontend()
