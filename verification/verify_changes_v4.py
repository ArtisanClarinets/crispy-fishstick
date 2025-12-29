from playwright.sync_api import sync_playwright
import time

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        # Enable console logging
        page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))

        try:
            print("Verifying Contact Form Toast...")
            page.goto("http://localhost:3000/contact")

            # Wait for hydration/animation
            page.wait_for_timeout(2000)

            # Step 1
            print("Filling Step 1...")
            # Wait for visibility
            page.wait_for_selector("input[id='name']", state="visible")

            # Focus and fill using press_sequentially for reliability
            page.locator("input[id='name']").click()
            page.locator("input[id='name']").press_sequentially("Test User", delay=50)

            page.locator("input[id='role']").click()
            page.locator("input[id='role']").press_sequentially("Tester", delay=50)

            # Screenshot before click
            page.screenshot(path="verification/debug_before_click_1.png")

            # Click Next Step
            print("Clicking Next Step...")
            page.locator("button[type='submit']").click()

            # Step 2
            print("Waiting for Step 2...")
            # Wait for the label of the second step
            try:
                page.wait_for_selector("label[for='budget']", timeout=10000, state="visible")
                print("Step 2 visible.")
            except Exception as e:
                print(f"Step 2 timeout. Page content dumping...")
                page.screenshot(path="verification/debug_stuck_step1.png")
                raise e

            # Wait for animation
            page.wait_for_timeout(500)

            # Fill Step 2
            page.locator("textarea[id='message']").click()
            page.locator("textarea[id='message']").press_sequentially("This is a test message.", delay=10)

            page.locator("button[type='submit']").click()

            # Step 3
            print("Waiting for Step 3...")
            page.wait_for_selector("label[for='email']", timeout=10000, state="visible")

            # Wait for animation
            page.wait_for_timeout(500)

            page.locator("input[id='email']").click()
            page.locator("input[id='email']").press_sequentially("test@example.com", delay=50)

            # Click send
            print("Clicking Send...")
            page.locator("button[type='submit']").click()

            # Wait for Toast
            print("Waiting for Toast...")
            # Look for the toast title specifically
            try:
                page.wait_for_selector("text=Message Sent", timeout=10000)
                print("Toast found.")
            except Exception as e:
                print("Toast not found. Dumping screenshot.")
                page.screenshot(path="verification/debug_no_toast.png")
                raise e

            page.screenshot(path="verification/contact_toast.png")
            print("Contact Toast Verified.")

        except Exception as e:
            print(f"Error: {e}")
            try:
                page.screenshot(path="verification/error_state.png")
            except:
                pass
        finally:
            browser.close()

if __name__ == "__main__":
    verify_frontend()
