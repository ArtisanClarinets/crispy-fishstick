
from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            # Go to the contact page
            page.goto("http://localhost:3000/contact")

            # Step 1: About You
            page.fill("input#name", "Test User")
            page.fill("input#role", "Tester")
            page.click("button:has-text('Next Step')")

            # Step 2: Project Details
            page.wait_for_selector("text=Estimated Budget Range")
            # Select budget (it's a standard select now)
            page.select_option("select#budget", "$25k - $50k")
            page.fill("textarea#message", "This is a test message to verify API integration.")
            page.click("button:has-text('Next Step')")

            # Step 3: Contact Info
            page.wait_for_selector("text=Work Email")
            page.fill("input#email", "test@example.com")
            page.fill("input#website", "https://example.com")

            # Submit
            page.click("button:has-text('Send Request')")

            # Wait for success message
            expect(page.get_by_text("Message Received")).to_be_visible(timeout=5000)

            # Take screenshot
            page.screenshot(path="verification/contact_success.png")
            print("Verification successful, screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/contact_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
