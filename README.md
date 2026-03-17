# Playwright Enterprise Automation Framework
![Playwright Tests](https://github.com/chandankumar-qa-ai/playwright-enterprise-automation-framework/actions/workflows/playwright.yml/badge.svg)
[![Allure Report](https://img.shields.io/badge/Allure%20Report-Live-blue)](https://chandankumar-qa-ai.github.io/playwright-enterprise-automation-framework/)

Playwright + TypeScript automation framework covering UI, visual, and API testing. The UI suite targets SauceDemo, the API suite targets Restful Booker, and the project is structured to demonstrate scalable test design, reusable fixtures, session reuse, and CI-ready reporting.

## Highlights

- Built with Playwright Test and TypeScript
- Uses Page Object Model for UI automation
- Uses reusable API client and service classes for API automation
- Reuses authenticated UI state through `globalSetup` and `storageState.json`
- Supports UI environment switching with `.env.qa`, `.env.uat`, and `.env.prod`
- Runs UI projects for Chromium, Firefox, and WebKit
- Runs visual regression on the inventory page in Chromium
- Publishes Allure reports to GitHub Pages
- Captures screenshot, video, and trace artifacts on failure
- Includes CI checks for lint, type-check, test execution, and report publishing

## Current State

| Area | Current State |
| --- | --- |
| Language | TypeScript |
| Test runner | Playwright Test |
| UI application | SauceDemo |
| API application | Restful Booker |
| UI browser projects | Chromium, Firefox, WebKit |
| Visual execution | Chromium only |
| Coverage types | Smoke, regression, visual, API |
| Current inventory | 8 spec files, 9 tests |
| UI authentication | `globalSetup` + `storageState.json` |
| Reporting | Playwright HTML + Allure |
| Failure diagnostics | Screenshot, video, trace |
| CI platform | GitHub Actions |
| Report publishing | GitHub Pages |
| UI environments | `qa`, `uat`, `prod` |

## Automated Coverage

### UI coverage

- Login with valid credentials
- Add item to cart
- Validate cart page
- Complete checkout information
- Validate checkout overview
- Validate checkout completion page
- Visual regression for the inventory page layout

### API coverage

- Generate auth token
- Create booking
- Read booking
- Update booking
- Delete booking

## Framework Architecture

### UI layer

UI interactions are implemented with page objects under `pages/`:

- `LoginPage`
- `InventoryPage`
- `CartPage`
- `CheckoutPage`
- `OverviewPage`
- `CheckoutCompletePage`

Shared actions such as navigation and common element interaction live in `BasePage`.

### UI fixtures

`fixtures/pageFixture.ts` extends Playwright's base test and injects page objects directly into tests. This keeps the test files focused on flow validation instead of setup plumbing.

### API layer

The API automation is split into reusable classes:

- `api/authApi.ts` for token generation
- `api/bookingApi.ts` for booking CRUD operations
- `fixtures/apiClient.ts` for creating and disposing an `APIRequestContext`

This keeps request configuration separate from endpoint behavior and makes the API tests easy to extend.

### Authenticated session reuse

`tests/setup/auth.setup.ts` creates and validates the UI login session before the suite runs. If a saved session is still valid, it is reused. If not, the setup logs in again and saves a fresh `storageState.json`.

### Configuration

- `playwright.config.ts` loads UI environment values from `.env.<TEST_ENV>`
- Default UI environment is `qa`
- `fixtures/apiClient.ts` targets `https://restful-booker.herokuapp.com`
- Local runs use `retries: 1` and `workers: 4`
- CI runs use `retries: 2` and `workers: 2`
- `headless: true` is enabled for consistent rendering

## Project Structure

```text
playwright-enterprise-automation-framework
|-- .github/
|   `-- workflows/
|       `-- playwright.yml
|-- api/
|   |-- authApi.ts
|   `-- bookingApi.ts
|-- config/
|   `-- env.ts
|-- fixtures/
|   |-- apiClient.ts
|   `-- pageFixture.ts
|-- pages/
|   |-- BasePage.ts
|   |-- CartPage.ts
|   |-- CheckoutCompletePage.ts
|   |-- CheckoutPage.ts
|   |-- InventoryPage.ts
|   |-- LoginPage.ts
|   `-- OverviewPage.ts
|-- tests/
|   |-- api/
|   |   `-- booking.spec.ts
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
|-- tsconfig.json
`-- README.md
```

## Installation

### Prerequisites

- Node.js 20 or later is recommended
- Playwright browsers installed locally

### Setup

```bash
npm install
npx playwright install
```

## Environment Configuration

UI tests read values from `.env.<environment>` files through `TEST_ENV`.

Supported UI profiles:

- `qa`
- `uat`
- `prod`

Example `.env.qa`:

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

`storageState.json` is generated automatically by the UI auth setup and is ignored by Git.

## Running The Framework

### Quality checks

```bash
npm run lint
npm run type-check
```

### Run all tests

```bash
npm run test
```

### Run smoke tests

```bash
npm run test:smoke
```

### Run regression tests

```bash
npm run test:regression
```

### Run visual tests

```bash
npm run test:visual
```

### Run API tests

```bash
npx playwright test tests/api/booking.spec.ts --project=chromium
```

### Run in headed mode

```bash
npm run test:headed
```

### Run in debug mode

```bash
npm run test:debug
```

### Run a specific browser project

```bash
npx playwright test --project=firefox
```

## Reports

Open the Playwright HTML report:

```bash
npm run report
```

Generate and open the Allure report locally:

```bash
npm run allure:generate
npm run allure:open
```

Live report:

- Allure report: https://chandankumar-qa-ai.github.io/playwright-enterprise-automation-framework/

## CI/CD Workflow

GitHub Actions is defined in `.github/workflows/playwright.yml`.

Current pipeline behavior:

- Triggers on pushes to `main` and `release/v1.1`
- Runs on `windows-latest`
- Uses Node.js 20
- Installs dependencies
- Runs lint and type-check
- Installs Playwright browsers
- Executes the Playwright suite
- Uploads Playwright artifacts
- Generates Allure output
- Publishes per-run and latest Allure reports to GitHub Pages

## GitHub Secrets Used In CI

- `BASE_URL`
- `SAUCE_USERNAME`
- `SAUCE_PASSWORD`

## Planned Enhancements

- Add dedicated API run script and project segregation
- Externalize API environment configuration
- Expand visual coverage beyond the inventory page
- Add more negative-path and edge-case scenarios
- Introduce richer test data management

## Author

Chandan Kumar

QA Automation Engineer portfolio project focused on maintainable Playwright architecture for UI, visual, and API automation.
