import time
from playwright.sync_api import sync_playwright

def verify_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 1024})
        page = context.new_page()

        try:
            # 1. Home Page
            print("Capturing Home Page...")
            page.goto("http://localhost:3000")
            page.wait_for_load_state("networkidle")
            page.screenshot(path="verification/home.png", full_page=True)
            print("Home Page captured.")

            # 2. Platform Page
            print("Capturing Platform Page...")
            page.goto("http://localhost:3000/platform")
            page.wait_for_load_state("networkidle")
            page.screenshot(path="verification/platform.png", full_page=True)
            print("Platform Page captured.")

            # 3. Academy Page
            print("Capturing Academy Page...")
            page.goto("http://localhost:3000/academy")
            page.wait_for_load_state("networkidle")
            page.screenshot(path="verification/academy.png", full_page=True)
            print("Academy Page captured.")

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_screenshots()
