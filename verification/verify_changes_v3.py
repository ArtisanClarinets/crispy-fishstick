from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # 2. Verify Contact Form Toast
            print("Verifying Contact Form Toast...")
            page.goto("http://localhost:3000/contact")

            # Debug: Screenshot initial state
            page.screenshot(path="verification/debug_step1.png")

            # Fill out form step 1
            print("Filling Step 1...")
            page.wait_for_selector("input[id='name']", state="visible")
            page.fill("input[id='name']", "Test User")
            page.fill("input[id='role']", "Tester")
            page.click("button:has-text('Next Step')")

            # Step 2
            print("Waiting for Step 2...")
            # Maybe the transition is slow or the element ID is wrong?
            # Let's wait for the text "Tell me a bit about the project" which is in the label
            page.wait_for_selector("text=Tell me a bit about the project", timeout=5000)
            page.screenshot(path="verification/debug_step2.png")

            page.fill("textarea[id='message']", "This is a test message for verification.")
            page.click("button:has-text('Next Step')")

            # Step 3
            print("Waiting for Step 3...")
            page.wait_for_selector("input[id='email']", timeout=5000)
            page.fill("input[id='email']", "test@example.com")

            # Click send
            page.click("button:has-text('Send Request')")

            # Wait for Toast
            print("Waiting for Toast...")
            page.wait_for_selector("text=Message Sent", timeout=10000)
            page.screenshot(path="verification/contact_toast.png")
            print("Contact Toast Verified.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_final.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_frontend()
