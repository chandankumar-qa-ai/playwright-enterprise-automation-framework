# Playwright Enterprise Automation Framework


![Playwright Tests](https://github.com/chandankumar-qa-ai/playwright-enterprise-automation-framework/actions/workflows/playwright.yml/badge.svg)

[![Allure Report](https://img.shields.io/badge/Allure%20Report-Live-blue)](https://chandankumar-qa-ai.github.io/playwright-enterprise-automation-framework/)


## Overview

This branch currently contains a Playwright UI automation framework for the SauceDemo e-commerce application, built with TypeScript and organized using patterns commonly used in QA teams.

The current automated flow covers:

- Login
- Product selection
- Add to cart
- Cart validation
- Checkout flow
- Order completion

The framework uses Page Object Model, custom Playwright fixtures, authenticated session reuse, environment-based configuration, and CI reporting.

---

# Current Status

- UI automation is implemented and runnable
- Authentication is handled through Playwright `globalSetup`
- Test coverage is organized under `smoke`, `regression`, and `visual`
- Chromium is the only active browser project
- HTML and Allure reporting are enabled
- API automation is not implemented in this branch yet

---

# Tech Stack

- Playwright
- TypeScript
- Node.js
- Dotenv
- GitHub Actions
- Allure Reporting
- Playwright HTML Report

---

# Framework Highlights

### Page Object Model

UI interactions are wrapped in page classes under `pages/`.

Current page objects include:

- `LoginPage`
- `InventoryPage`
- `CartPage`
- `CheckoutPage`
- `OverviewPage`
- `CheckoutCompletePage`

---

### Playwright Fixtures

Page objects are exposed through `fixtures/pageFixture.ts`, so tests can use them directly without constructing page classes in each spec.

Example test:

```ts
test("@regression Add Product to the Cart", async ({ inventoryPage, cartPage, page }) => {
  await page.goto("/inventory.html");
  await inventoryPage.AddProduct(["Sauce Labs Bike Light"]);
  await inventoryPage.gotoCart();
});
```

---

### Authentication Handling

Authentication is executed once through `tests/setup/auth.setup.ts` using Playwright `globalSetup`.

The session is stored in:

```text
storageState.json
```

This allows the main UI flow tests to start in an authenticated state.

---

### Environment Configuration

The framework loads environment values from `.env.<environment>` based on `TEST_ENV`.

Current environment files in the project:

- `.env.qa`
- `.env.uat`
- `.env.prod`

If `TEST_ENV` is not set, the framework defaults to `qa`.

Example:

```env
BASE_URL=https://www.saucedemo.com
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
```

PowerShell example:

```powershell
$env:TEST_ENV = "uat"
npm run test
```

In CI, the same values are provided through GitHub Secrets.

---

### Reporting

The project supports:

- Playwright HTML report
- Allure report
- Failure screenshots
- Failure videos
- Failure traces

Generate reports locally:

```bash
npm run report
npm run allure:generate
npm run allure:open
```

---

### CI/CD Pipeline

GitHub Actions is configured in `.github/workflows/playwright.yml`.

Current workflow behavior:

- Triggers on pushes to `main`
- Uses Node.js 20
- Installs dependencies
- Installs Playwright browsers with dependencies
- Runs the Playwright suite
- Generates Allure output
- Publishes the report to GitHub Pages

---

### Test Artifacts

On failure, Playwright retains:

- Screenshots
- Videos
- Trace files

---

# Project Structure

```text
playwright-enterprise-automation-framework
|-- .github
|   `-- workflows
|       `-- playwright.yml
|-- config
|   `-- env.ts
|-- fixtures
|   `-- pageFixture.ts
|-- pages
|   |-- BasePage.ts
|   |-- CartPage.ts
|   |-- CheckoutCompletePage.ts
|   |-- CheckoutPage.ts
|   |-- InventoryPage.ts
|   |-- LoginPage.ts
|   `-- OverviewPage.ts
|-- tests
|   |-- regression
|   |   |-- Overview.spec.ts
|   |   |-- addToCart.spec.ts
|   |   |-- cart.spec.ts
|   |   |-- checkout.spec.ts
|   |   `-- checkoutcomplete.spec.ts
|   |-- setup
|   |   `-- auth.setup.ts
|   |-- smoke
|   |   `-- login.spec.ts
|   `-- visual
|       `-- homepage.visual.spec.ts
|-- package.json
|-- playwright.config.ts
`-- README.md
```

<!--
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
-->

---

# Installation

```bash
npm install
npx playwright install
```

---

# Running Tests

Run all tests:

```bash
npm run test
```

Run smoke tests:

```bash
npm run test:smoke
```

Run regression tests:

```bash
npm run test:regression
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run tests in debug mode:

```bash
npm run test:debug
```

---

# Reports

Open the Playwright HTML report:

```bash
npm run report
```

Generate and open the Allure report:

```bash
npm run allure:generate
npm run allure:open
```

---

# Workflow Secrets

The workflow expects these GitHub Secrets:

- `BASE_URL`
- `SAUCE_USERNAME`
- `SAUCE_PASSWORD`

---

# Notes

- Chromium is the only active browser project in `playwright.config.ts`
- Firefox, WebKit, mobile, and branded browser projects are scaffolded but currently commented out
- The repository includes a `tests/visual` folder, but the branch is still primarily a UI functional automation framework
- API automation remains a future enhancement for this branch

---

# Author

QA Automation Portfolio Project

This repository demonstrates a practical Playwright UI automation framework with authentication reuse, reporting, and CI integration.
