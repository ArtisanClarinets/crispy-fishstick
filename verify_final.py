from playwright.sync_api import sync_playwright

def verify_final_state():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Home Page
        print("Checking Home Page...")
        page.goto("http://localhost:3000")
        page.wait_for_timeout(2000) # Wait for animations
        page.screenshot(path="verification_final_home.png")
        print("Captured Home")

        # 2. Verify Work Page and Card Classes
        print("Checking Work Page...")
        page.goto("http://localhost:3000/work")
        page.wait_for_timeout(2000)

        # Check for card-precision class
        cards = page.locator(".card-precision")
        count = cards.count()
        print(f"Found {count} elements with 'card-precision' class")

        page.screenshot(path="verification_final_work.png")
        print("Captured Work")

        browser.close()

if __name__ == "__main__":
    verify_final_state()
