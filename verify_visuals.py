from playwright.sync_api import sync_playwright

def verify_styling():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_default_timeout(60000)

        # Navigate to homepage
        try:
            page.goto("http://localhost:3000", wait_until="load")

            # Take screenshot of Hero Section
            page.screenshot(path="verification/home_hero.png")
            print("Captured home_hero.png")

            # Scroll down to work section and capture
            page.evaluate("window.scrollBy(0, 1000)")
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/home_work.png")
            print("Captured home_work.png")

            # Navigate to Services
            page.goto("http://localhost:3000/services", wait_until="load")
            page.screenshot(path="verification/services.png")
            print("Captured services.png")

            # Navigate to Contact
            page.goto("http://localhost:3000/contact", wait_until="load")
            page.screenshot(path="verification/contact.png")
            print("Captured contact.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_styling()
