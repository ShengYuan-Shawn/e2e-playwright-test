# E2E Playwright Test

An end-to-end testing automation framework for e-commerce applications built with TypeScript and Playwright.

## Tech Stack

- **TypeScript** - Type-safe test development
- **Playwright** - Cross-browser automation framework

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/e2e-playwright-test.git
cd e2e-playwright-test
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Project Structure

```
e2e-playwright-test/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD workflow configuration
├── factory/
│   ├── LocatorsFactory.ts          # Centralized locator management
│   └── productDetails.ts           # Product data factory
├── fixtures/
│   └── testSetup.ts                # Test fixtures and setup
├── pages/                          # Page Object Models
│   ├── base.page.ts                # Base page with common methods
│   ├── cart.page.ts                # Cart page interactions
│   ├── checkout.page.ts            # Checkout flow
│   └── login.page.ts               # Login functionality
├── tests/                          # Test specifications
│   ├── cart/
│   │   └── cart-test.spec.ts       # Cart feature tests
│   ├── home/
│   │   └── home-test.spec.ts       # Home page tests
│   └── login/
│       └── login-test.spec.ts      # Login tests
├── utils/
│   └── commonUtils.ts              # Helper utilities
├── .env                            # Environment variables
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies and scripts
├── package-lock.json               # Locked dependencies
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run specific test file
```bash
npx playwright test tests/cart/cart-test.spec.ts
npx playwright test tests/login/login-test.spec.ts
npx playwright test tests/home/home-test.spec.ts
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### View test report
```bash
npx playwright show-report
```

### Debug tests
```bash
npx playwright test --debug
```

## Best Practices

1. **Page Object Model** - All page interactions are encapsulated in page classes under `/pages`
2. **Factory Pattern** - Use `locatorsFactory.ts` for centralized locator management
3. **Test Fixtures** - Leverage `testSetup.ts` for reusable test configurations
4. **Base Page** - Common functionality is inherited from `base.page.ts`
5. **Test Organization** - Tests are organized by feature in separate directories
6. **Type Safety** - Full TypeScript support for better code quality
7. **CI/CD Ready** - GitHub Actions workflow configured for automated testing

## CI/CD

This project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that automatically runs tests on:
- Push to main branch
- Pull requests
- Scheduled intervals

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue in the repository.