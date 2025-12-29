from playwright.sync_api import sync_playwright

def verify_process_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the process page
        page.goto("http://localhost:3000/process")

        # Wait for the Execution Protocol to load
        page.wait_for_selector('text="EXECUTION_PROTOCOL"')

        # Scroll down to trigger intersection observer
        page.evaluate("window.scrollBy(0, 500)")
        page.wait_for_timeout(1000) # Wait for animations

        # Take a screenshot
        page.screenshot(path="verification/process_page.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_process_page()
