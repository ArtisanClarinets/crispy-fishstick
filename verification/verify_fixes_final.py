from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Verify Home Page
        print("Navigating to home page...")
        page.goto("http://localhost:3000")
        page.wait_for_selector("body")
        page.screenshot(path="verification/home_page.png")
        print("Home page screenshot captured.")

        # Verify Work Page (should render WorkList)
        print("Navigating to work page...")
        page.goto("http://localhost:3000/work")
        page.wait_for_selector("text=Selected Work")
        page.screenshot(path="verification/work_page.png")
        print("Work page screenshot captured.")

        # Verify Contact Form (visual check only, testing delivery requires more)
        print("Navigating to contact page...")
        page.goto("http://localhost:3000/contact")
        page.wait_for_selector("form")
        page.screenshot(path="verification/contact_page.png")
        print("Contact page screenshot captured.")

        browser.close()

if __name__ == "__main__":
    try:
        verify_changes()
    except Exception as e:
        print(f"Error: {e}")
