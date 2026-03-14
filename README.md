# Playwright Enterprise Automation Framework
# Playwright Enterprise Automation Framework

![Playwright Tests](https://github.com/chandankumar-qa-ai/playwright-enterprise-automation-framework/actions/workflows/playwright.yml/badge.svg)

[![Allure Report](https://img.shields.io/badge/Allure%20Report-Live-blue)](https://chandankumar-qa-ai.github.io/playwright-enterprise-automation-framework/)# Playwright Enterprise Automation Framework

![Playwright Tests](https://github.com/chandankumar-qa-ai/playwright-enterprise-automation-framework/actions/workflows/playwright.yml/badge.svg)

[![Allure Report](https://img.shields.io/badge/Allure%20Report-Live-blue)](https://chandankumar-qa-ai.github.io/playwright-enterprise-automation-framework/)



## Overview

This project is a **Playwright-based end-to-end automation framework** built using **TypeScript** and designed following **modern automation architecture practices used in real QA teams**.

The framework automates the **SauceDemo e-commerce application** and validates the **complete purchase flow** including:

* Login
* Product selection
* Add to cart
* Checkout validation

The framework demonstrates **scalable automation design**, CI/CD integration, authentication reuse, and reporting.

---

# Tech Stack

* Playwright
* TypeScript
* Node.js
* GitHub Actions (CI/CD)
* Allure Reporting
* Playwright HTML Reporting

---

# Framework Features

### Page Object Model (POM)

All UI interactions are encapsulated inside page classes to improve maintainability and readability.

Example pages:

* LoginPage
* InventoryPage
* CartPage
* CheckoutPage

---

### Playwright Fixtures

Page objects are injected using **custom Playwright fixtures**, eliminating the need to create page objects manually in tests.

Example test:

```
test('add product to cart', async ({ inventoryPage }) => {
  await inventoryPage.addProductToCart('Sauce Labs Backpack')
})
```

---

### Authentication Handling

Authentication is executed once using **Playwright global setup**.

The login session is stored using:

```
storageState.json
```

This allows tests to start **already authenticated**, improving execution speed and reliability.

---

### Environment Configuration

The framework uses environment variables for configuration.

Credentials and URLs are loaded using:

```
.env
```

Example:

```
BASE_URL=https://www.saucedemo.com
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
```

In CI pipelines the same values are provided via **GitHub Secrets**.

---

### Reporting

The framework supports two reporting systems.

#### Playwright HTML Report

Generate report locally:

```
npm run report
```

---

#### Allure Reporting

Allure provides advanced dashboards including:

* test history
* failure details
* execution timeline
* attachments

Generate locally:

```
npm run allure:generate
npm run allure:open
```

---

### CI/CD Pipeline

Tests automatically execute using **GitHub Actions** whenever code is pushed.

Pipeline stages:

1. Install dependencies
2. Install Playwright browsers
3. Execute tests
4. Generate Allure report
5. Upload test artifacts

CI pipeline runs **in headless mode** to ensure compatibility with the Linux environment.

---

### Test Artifacts

On failure, the pipeline automatically captures:

* Screenshots
* Videos
* Playwright trace files

Artifacts are uploaded in GitHub Actions and can be downloaded after each run.

---

# Project Structure

```
playwright-enterprise-automation-framework
│
├── tests
│   ├── setup
│   │   └── auth.setup.ts
│   │
│   ├── smoke
│   │
│   └── regression
│
├── pages
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│
├── fixtures
│   └── pageFixture.ts
│
├── config
│   └── envLoader.ts
│
├── utils
│
├── playwright.config.ts
│
├── package.json
│
└── README.md
```

---

# Installation

Clone the repository:

```
git clone <repository-url>
```

Install dependencies:

```
npm install
```

Install Playwright browsers:

```
npx playwright install
```

---

# Running Tests

Run all tests:

```
npm run test
```

Run smoke tests:

```
npm run test:smoke
```

Run regression tests:

```
npm run test:regression
```

Run tests in headed mode:

```
npm run test:headed
```

---

# View Reports

Playwright HTML report:

```
npm run report
```

Allure report:

```
npm run allure:generate
npm run allure:open
```

---

# CI Pipeline

The GitHub Actions workflow performs the following:

* installs dependencies
* installs browsers
* runs Playwright tests
* generates Allure reports
* uploads execution artifacts

Environment variables are securely provided via **GitHub Secrets**.

---

# Future Enhancements

Planned improvements:

* API automation tests using Playwright request API
* Visual testing using Playwright screenshots
* Multi-user authentication using multiple storage states
* Cross-browser parallel execution
* GitHub Pages hosted Allure reports

---

# Author

QA Automation Portfolio Project

This project demonstrates modern automation framework design using Playwright and CI/CD practices commonly used in real-world QA teams.
