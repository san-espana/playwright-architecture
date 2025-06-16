import { test as base } from '@playwright/test';
import { KeyGenPage } from '../pages/keyGen.page';

export const test = base.extend<{ keyGenPage: KeyGenPage }>({
  keyGenPage: async ({ page }, use) => {
    const keyGenPage = new KeyGenPage(page);
    await keyGenPage.goto();
    await use(keyGenPage);
  },
});

export { expect } from '@playwright/test'; 