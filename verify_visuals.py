from playwright.sync_api import sync_playwright

def verify_visuals():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Home Page (Hero + System Layer)
        page.goto("http://localhost:3000")
        page.wait_for_timeout(2000) # Wait for animations
        page.screenshot(path="verification_home_hero.png")
        print("Captured Home Hero")

        # 2. Verify Work Page (Listing)
        page.goto("http://localhost:3000/work")
        page.wait_for_timeout(2000)
        page.screenshot(path="verification_work_list.png")
        print("Captured Work List")

        # 3. Verify Detail Page (Shared Element)
        # Click the first project to test transition
        page.locator("a[href^='/work/']").first.click()
        page.wait_for_url("**/work/*")
        page.wait_for_timeout(1000) # Wait for transition
        page.screenshot(path="verification_work_detail.png")
        print("Captured Work Detail")

        browser.close()

if __name__ == "__main__":
    verify_visuals()
