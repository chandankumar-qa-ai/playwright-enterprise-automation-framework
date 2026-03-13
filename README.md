# Playwright Automation Framework

## Overview

This project is a **Playwright-based end-to-end automation framework** built using **TypeScript**.
It demonstrates a scalable test automation architecture using modern best practices such as Page Object Model, custom fixtures, authentication reuse, and CI integration.

The framework automates the **SauceDemo e-commerce application** and covers the complete **buy flow** including login, product selection, cart validation, and checkout.

---

## Tech Stack

* Playwright
* TypeScript
* Node.js
* GitHub Actions (CI)
* HTML Reporting

---

## Framework Features

* Page Object Model (POM)
* Custom Playwright Fixtures for Page Objects
* Authentication handling using `storageState`
* Global setup for login
* Test tagging (`@smoke`, `@regression`)
* Parallel test execution
* Automatic screenshots and traces on failure
* HTML test reports

---

## Project Structure

```
playwright-automation-framework
│
├── tests
│   ├── setup
│   │   └── auth.setup.ts
│   │
│   ├── smoke
│   │   └── login.spec.ts
│   │
│   └── regression
│       └── buyflow.spec.ts
│
├── pages
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CartPage.ts
│
├── fixtures
│   └── pageFixture.ts
│
├── config
│   └── env.ts
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

## Setup Instructions

### Install dependencies

```
npm install
```

### Install Playwright browsers

```
npx playwright install
```

---

## Running Tests

Run all tests:

```
npx playwright test
```

Run smoke tests:

```
npx playwright test --grep @smoke
```

Run regression tests:

```
npx playwright test --grep @regression
```

---

## Test Reports

After running tests, view the HTML report:

```
npx playwright show-report
```

The report includes:

* test results
* screenshots
* videos
* execution traces

---

## Authentication Strategy

The framework uses **Playwright storageState** to reuse authenticated sessions.

Login is executed once in **global setup**, and the authentication state is saved to:

```
storageState.json
```

All tests reuse this state to avoid repeated login.

---

## CI Pipeline

Tests are automatically executed in GitHub Actions when code is pushed to the repository.

Pipeline steps include:

* Checkout repository
* Install dependencies
* Install Playwright browsers
* Execute tests

---

## Author

QA Automation Engineer Portfolio Project

This project demonstrates modern test automation practices using Playwright.
