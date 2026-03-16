# Playwright Enterprise Automation Framework
![Playwright Tests](https://github.com/chandankumar-qa-ai/playwright-enterprise-automation-framework/actions/workflows/playwright.yml/badge.svg)
[![Allure Report](https://img.shields.io/badge/Allure%20Report-Live-blue)](https://chandankumar-qa-ai.github.io/playwright-enterprise-automation-framework/)

Production-minded UI automation framework built with Playwright and TypeScript for the SauceDemo web application. This project is designed as a recruiter-friendly QA automation portfolio piece that demonstrates maintainable test architecture, environment-aware execution, reusable authentication, visual validation, and CI reporting.

## Why This Project Stands Out

- Built with **Playwright + TypeScript** using a clean Page Object Model structure
- Uses **custom fixtures** to inject page objects and keep tests readable
- Reuses login state through **`globalSetup` + `storageState.json`**
- Supports **environment-based execution** with `qa`, `uat`, and `prod` profiles
- Covers **smoke, regression, and visual testing** in one framework
- Publishes **Allure results to GitHub Pages** and stores Playwright artifacts in CI
- Shows practical automation engineering skills recruiters look for: scalability, reporting, maintainability, and CI/CD readiness

## Current Capability Snapshot

| Area | Current Implementation |
| --- | --- |
| Language | TypeScript |
| Test Runner | Playwright Test |
| Application Under Test | SauceDemo |
| Active Browser Project | Chromium |
| Test Types | Smoke, Regression, Visual |
| Current Test Count | 7 tests across 7 spec files |
| Authentication Strategy | `globalSetup` with saved storage state |
| Reporting | Playwright HTML + Allure |
| Failure Diagnostics | Screenshot, video, trace |
| CI Platform | GitHub Actions |
| Report Publishing | GitHub Pages |
| Environment Profiles | `.env.qa`, `.env.uat`, `.env.prod` |

## What Is Automated Today

The current framework automates the core purchase flow and visual UI validation:

- Login with valid credentials
- Add product to cart
- Validate cart page
- Complete checkout information
- Review overview page and finish order
- Validate checkout completion message
- Run visual regression on the inventory page

## Framework Architecture

### 1. Page Object Model

UI behavior is encapsulated in dedicated page classes under `pages/`:

- `LoginPage`
- `InventoryPage`
- `CartPage`
- `CheckoutPage`
- `OverviewPage`
- `CheckoutCompletePage`

Each page object inherits shared behavior from `BasePage`, which keeps navigation and common interactions centralized.

### 2. Custom Fixtures

The framework extends Playwright's base test via `fixtures/pageFixture.ts`, so tests receive ready-to-use page objects without repeated setup code.

```ts
test("@regression Add Product to the Cart", async ({ inventoryPage, cartPage, page }) => {
  await page.goto("/inventory.html");
  await inventoryPage.AddProduct(["Sauce Labs Bike Light"]);
  await inventoryPage.gotoCart();
});
```

### 3. Authenticated Session Reuse

Login is executed once in `tests/setup/auth.setup.ts`, and the authenticated session is persisted into `storageState.json`. This keeps the regression flow fast and avoids repeating the login step in every spec.

### 4. Environment-Aware Configuration

The framework loads credentials and base URL from `.env.<environment>` files based on `TEST_ENV`.

- Default environment: `qa`
- Supported profiles: `qa`, `uat`, `prod`

Example:

```env
BASE_URL=https://www.saucedemo.com
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
```

PowerShell:

```powershell
$env:TEST_ENV = "uat"
npm run test
```

Bash:

```bash
TEST_ENV=uat npm run test
```

### 5. Reporting and Debuggability

The framework is configured to keep rich diagnostics on failure:

- HTML report
- Allure report
- Failure screenshots
- Failure videos
- Failure traces

This makes the project useful not just for execution, but also for triage and stakeholder reporting.

## Playwright Configuration Highlights

- `fullyParallel: true`
- `retries: 1` locally and `2` in CI
- `workers: 4` locally and `2` in CI
- `forbidOnly` enabled in CI
- `headless: true` for consistent rendering
- Chromium is the active project today
- Firefox, WebKit, mobile, and branded browser targets are scaffolded and can be enabled later

## CI/CD Workflow

GitHub Actions is configured in `.github/workflows/playwright.yml`.

Current pipeline behavior:

- Triggers on pushes to `main` and `release/v1.1`
- Runs on `windows-latest`
- Uses Node.js 20
- Installs project dependencies
- Installs Playwright browsers
- Executes the Playwright suite
- Uploads Playwright reports and test artifacts
- Generates Allure output
- Publishes per-run and latest Allure reports to GitHub Pages

This gives the framework a strong "enterprise-ready" feel by combining automation execution with report visibility.

## Project Structure

```text
playwright-enterprise-automation-framework
|-- .github/
|   `-- workflows/
|       `-- playwright.yml
|-- config/
|   `-- env.ts
|-- fixtures/
|   `-- pageFixture.ts
|-- pages/
|   |-- BasePage.ts
|   |-- LoginPage.ts
|   |-- InventoryPage.ts
|   |-- CartPage.ts
|   |-- CheckoutPage.ts
|   |-- OverviewPage.ts
|   `-- CheckoutCompletePage.ts
|-- tests/
|   |-- regression/
|   |   |-- addToCart.spec.ts
|   |   |-- cart.spec.ts
|   |   |-- checkout.spec.ts
|   |   |-- checkoutcomplete.spec.ts
|   |   `-- Overview.spec.ts
|   |-- setup/
|   |   `-- auth.setup.ts
|   |-- smoke/
|   |   `-- login.spec.ts
|   `-- visual/
|       |-- Inventorypage.visual.spec.ts
|       `-- Inventorypage.visual.spec.ts-snapshots/
|-- playwright.config.ts
|-- package.json
|-- storageState.json
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

## Installation

```bash
npm install
npx playwright install
```

## Running The Test Suite

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

Run in headed mode:

```bash
npm run test:headed
```

Run in debug mode:

```bash
npm run test:debug
```

---

## Reports

Open the Playwright HTML report:

```bash
npm run report
```

Generate and open the Allure report:

```bash
npm run allure:generate
npm run allure:open
```

Live report:

- Allure Report: https://chandankumar-qa-ai.github.io/playwright-enterprise-automation-framework/

## GitHub Secrets Used In CI

- `BASE_URL`
- `SAUCE_USERNAME`
- `SAUCE_PASSWORD`


## Planned Enhancements

- Expand visual coverage beyond the inventory page
- Enable additional browser projects
- Add negative-path and edge-case coverage
- Introduce API automation coverage
- Add richer test data and tagging strategies

## Author

Chandan Kumar  
QA Automation Engineer Portfolio Project

This repository is intentionally structured to showcase real-world automation engineering practices, not just basic Playwright scripts.
