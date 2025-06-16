# Playwright Style & Architecture Manual

This document defines the style guide and architectural principles for writing Playwright tests in TypeScript, aligned with CLEAN architecture practices.

The goal is to:

- Ensure test readability, scalability, and reusability
- Promote the separation of concerns
- Keep specs clean and maintainable over time
- Establish a shared vocabulary and structure for all contributors

It is intended for developers, QA engineers, and automation engineers working on end-to-end testing using Playwright.

We follow modern testing strategies, including **Page Object Models (POM)** and **Custom Fixtures** to achieve modularity and abstraction — the same way backend systems use service layers and dependency injection in CLEAN architecture.

# Folder Structure

Organize your tests into clear folders by responsibility. This keeps logic decoupled, promotes reuse, and makes onboarding easier.

```
tests/
├── fixtures/          # Custom test setup, contexts, and dependencies
│   └── auth.fixture.ts
│
├── pages/             # Page Object Models (UI abstraction)
│   ├── login.page.ts
│   └── dashboard.page.ts
│
├── specs/             # Actual test cases
│   ├── login.spec.ts
│   └── dashboard.spec.ts
│
├── utils/             # Shared utilities and helper functions
│   └── testData.ts
│
├── test.setup.ts      # Global setup logic for tests
├── global-setup.ts    # (Optional) For initializing once per suite
└── playwright.config.ts
```

# Architecture Philosophy

Design your test suite with the same discipline as you would design a scalable software system.

Inspired by CLEAN Architecture, our approach ensures that the testing code is:

- **Modular**: Each part has a single responsibility.
- **Decoupled**: Test behavior is isolated from implementation details.
- **Reusable**: Logic can be shared across test cases and projects.
- **Easy to change**: Updates to the UI or workflow should only affect Page Objects, not specs.

We achieve this through the following layers:

## Specs → Behavior-focused

Specs describe what the user should experience (user-face locators), not how the system implements it. They avoid direct interaction with UI elements and instead call reusable methods from Page Objects or fixtures.

## Page Objects → UI abstraction

The Page Object Model (POM) layer encapsulates page structure and actions. This protects specs from changes in DOM structure or selectors. If the UI changes, update the POM (not every test).

Each class should model a single page or component and expose high-level actions (e.g., `login()`, `goToDashboard()`).

## Fixtures → Context injection

Fixtures allow tests to run in different states, like:

- Logged in / logged out
- User with permissions / no permissions
- Mocked API responses

They abstract repetitive setup/teardown logic and let you plug in different test contexts without duplicating code.

## Utils → Shared tools

For anything that doesn’t belong in a spec, POM, or fixture — like test data factories, random ID generators, and date utilities — place it in `utils/`. This follows the single responsibility principle and avoids clutter in other layers.

## Why This Matters

- **Readability**: New contributors understand tests faster.
- **Maintainability**: Changes in the UI don't break dozens of files.
- **Scalability**: Tests grow cleanly as features expand.
- **Debuggability**: Failures are isolated, meaningful, and easier to trace.

Just like backend developers use interfaces, repositories, and dependency injection to control complexity, we use POM, fixtures, and setup hooks to build a robust and testable front-end automation system.

# Best Practices

## Use descriptive test and step titles

By using descriptive names for your tests and steps, you'll ensure a faster troubleshooting process, and it also helps prevent the test from becoming overloaded with superfluous checks.

❌ **Bad**:  
`[chromium] › example.spec.js:4:1 › has title`

✅ **Good**:  
`[chromium] › example.spec.js:4:1 › Page title should contain "Playwright docs"`


## Use user-face locators

Prefer semantic and accessible locators like `getByRole`, `getByLabel`, or `getByText`. These are resilient to layout and styling changes.

✅ **Good**:  
`await page.getByRole('button', { name: 'Submit' })`


## Chain locators for precision

You can filter and chain locators to target specific elements in context.

✅ **Good**:

```ts
const product = page.getByRole('listitem').filter({ hasText: 'Product 2' });
await product.getByRole('button', { name: 'Add to cart' }).click();
```


## Don’t use XPath or CSS selectors

CSS/XPath selectors are fragile and tied to UI structure. Prefer semantic locators that reflect user behavior.

❌ **Bad**:  
`page.locator('button.buttonIcon.episode-actions-later')`


## Use codegen to generate locators

Playwright’s codegen tool can automatically generate resilient locators using roles, text, and test IDs, helping avoid flakiness.

```sh
npx playwright codegen https://your-site.com
```


## Use web-first assertions

Web-first assertions like `toBeVisible()` or `toHaveText()` automatically wait until the condition is met — no need for `sleep()`.

✅ **Good**:  
`await expect(page.getByText('welcome')).toBeVisible()`

❌ **Bad**:  
`expect(await page.getByText('welcome').isVisible()).toBe(true)`

(...continuará en el archivo completo)


## Use Soft assertions
Soft assertions collect all failures without stopping test execution. Useful for validating multiple expectations in a single run.

```ts
test('Soft example', async ({ page, expect }) => {
        await expect.soft(page.locator('h1')).toHaveText('Hello');
        await expect.soft(page.locator('h2')).toBeVisible();
  });
```


## Avoid testing third-party dependencies
Tests should only verify what you control. Don't rely on external websites or APIs — they introduce flakiness and increase test time.

✅ Use network mocking:
```ts
await page.route('**/api/external', route =>
    route.fulfill({ status: 200, body: testData })
);
```


## Test across all browsers 
Playwright supports Chromium, Firefox, and WebKit out of the box. Run your tests on all supported browsers to ensure full compatibility.


## Keep your Playwright dependency up to date
New browser versions often introduce changes. Updating Playwright regularly helps catch regressions early and ensures compatibility.


# Fixtures & Hooks

## Separation of concerns
Organize your test suite into clear, single-responsibility layers, following the Separation of Concerns principle:

- **Specs** contain the business behavior you want to validate.

- **Page** Objects encapsulate UI interactions.

- **Fixtures** handle setup and dependencies.

- **Utils** offer helper functions shared across files.

This makes the code more scalable, easier to maintain, and more aligned with CLEAN architecture principles used in backend systems.

## Use BeforeEach and AfterEach hooks
Use `beforeEach()` and `afterEach()` to keep your specs clean and DRY. Common setup steps like navigating to the base URL or logging in should be done here, not repeated inside each test. 

```ts
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

------------------------------------

test.afterEach(async ({ page }) => {
  	await page.close();
});
```

## Use Custom Fixtures
Fixtures allow you to inject context-specific logic (like authenticated users, seeded data, or mocked APIs) into your tests, without repeating setup steps. Custom fixtures increase reusability, improve isolation, and reduce test flakiness.

**Location**: `tests/fixtures/auth.fixture.ts`

```ts
export const test = base.extend({
  authPage: async ({ page }, use) => {
        const auth = new AuthPage(page);
        await auth.login();
        await use(auth);
    },
})
```

Then in your test:

```ts
test('user can access dashboard', async ({ authPage }) => {
  await authPage.goToDashboard();
  await expect(page.getByText('Welcome')).toBeVisible();
})
```

## Use Page Object Models
Use POM to abstract page-level operations and selectors into classes. This keeps your tests readable and reduces duplication. Avoid hardcoding locators in your tests and centralize them in Page Objects.

Location: `pages/login.page.ts`

```ts
export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
```

Usage in Test: `specs/login.spec.ts`

```ts
test('login should redirect to dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('admin', '1234');
  await expect(page).toHaveURL(/.*dashboard/);
});
```

**Tip**: Use composition in POMs if you have reusable components like headers, navbars, or modals. This keeps the code modular and scalable.

# CI/CD Integration

## Automate Test Runs on Every Commit
Set up CI/CD pipelines to run your tests frequently. The earlier you catch bugs, the cheaper they are to fix. Ideally, tests should run:

- On every commit

- On every pull request

- Before every deployment

Playwright includes a built-in GitHub Actions workflow template, allowing you to run tests on CI with zero manual setup. It can also be integrated with other CI providers like GitLab CI, Jenkins, CircleCI, etc.

## Optimize Browser Downloads
On CI, only install the browsers you need. For example, Chromium:

```sh
npx playwright install chromium
```

Avoid downloading all three browsers unless necessary. This speeds up your pipeline and reduces resource usage.

## Lint Your Tests
Use TypeScript and ESLint to catch errors early in development. Recommended ESLint rule:

```sh
"@typescript-eslint/no-floating-promises": "error"
```

This ensures you're not forgetting to await asynchronous Playwright API calls, which is a common source of flakiness.

On CI, run the following to enforce type correctness:

```sh
 tsc --noEmit
```

This ensures functions are called with correct signatures, without generating output files.

## Use Parallelism & Sharding
Playwright runs test files in parallel by default. Within a file, tests run sequentially. To improve performance:

- Split tests across multiple files

- Use `--shard` and `--shard-index` flags to distribute test runs across CI workers

Example:

```sh
npx playwright test --shard=3/5
```

This will run 3 out of 5 shards in your CI system. Also, it's possible to merge all the reports into a single one. 

# Final Thoughts

By following these best practices (from architectural principles to locator strategies, custom fixtures, and CI/CD integration) we'll create scalable, maintainable, and reliable Playwright test suites.

The key to long-term success is consistency:

- Structure your code clearly

- Use descriptive naming

- Embrace reusability with fixtures and Page Objects

- Catch issues early with CI and linting

- Optimize performance with parallelism and sharding

For more information, check out the Playwright Documentation


Test early, test often — and automate with confidence. 

## 📚 Bibliography

For more information, check out the Playwright Documentation:

- [Playwright Page Object Model (POM)](https://playwright.dev/docs/pom)  
  Learn how to structure your tests using the Page Object Model design pattern.

- [Playwright Test Fixtures](https://playwright.dev/docs/test-fixtures)  
  Understand how to create reusable setup and teardown logic with custom fixtures.

- [Playwright Codegen](https://playwright.dev/docs/codegen)  
  Automatically generate tests by recording browser interactions.

Additional resources:

- [Playwright GitHub Repository](https://github.com/microsoft/playwright)  
  The official Playwright repository. Great for examples, updates, and community discussions.

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)  
  The official guide to TypeScript, essential for writing scalable Playwright tests.