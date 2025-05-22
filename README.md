# Playwright Demo Project

This repository showcases a test automation framework developed using Playwright and TypeScript, adhering to the Page Object Model (POM) design pattern. The framework is designed to facilitate scalable and maintainable end-to-end testing for web applications. It demonstrates best practices in test automation, including modular test scripts, reusable page objects, and integration with Sauce Labs for cross-browser testing.

### Features
- **Page Object Model (POM):** Organizes test scripts to promote reusability and maintainability.
- **Allure Reporting:** Generates detailed and visually appealing test reports.
- **TypeScript Support:** Ensures type safety and moder JavaScript features.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GarvitVyas/SauceLab_Playwright.git
   cd SauceLab_Playwright
2. Install dependencies:
   ```bash
   npm install
3. Install Playwright browsers
   ```bash
   npx playwright install
4. Set up environment variables for Sauce labs credentials:
- Create a .env file in the root directory.
- Add your SAuce labs credentials:
  ```bash
  username=your_username
  password=your_password
  base = https://www.saucedemo.com/
5. Run the tests:
   ```bash
   npx playwright test
6. Generate allure reports:
   ```bash
   npx allure generate allure-results --clean
   npx allure open
