import { test, expect } from '../fixtures/keyGen.fixture';
// Removed import of randomKeyName as we will generate names within tests for clarity

test.describe('API Key-Gen Suite (POM + Fixture)', () => {
  
  test('should create a new API Key', async ({ keyGenPage }) => {
    const keyName = `Test Key #${Math.floor(Math.random() * 1000)}`;
    await keyGenPage.createKey(keyName, 'Development');

    await expect(keyGenPage.getToastByAction("created")).toBeVisible()
    await expect(keyGenPage.page.getByText(keyName)).toBeVisible();
  });

  test('should show and hide a Key', async ({ keyGenPage }) => {
    const encryptedPattern = new RegExp(`^${keyGenPage.keyPrefix}[a-zA-Z0-9]{2}\\*+$`);
    const nonEncryptedPattern = new RegExp(/^\*+$/);
  
    const firstKey = await keyGenPage.findFirstKey();
    const row = await keyGenPage.getKeyRow(firstKey)
    const keyCell = await keyGenPage.getKeyCell(row);

    await expect(keyCell).toHaveText(encryptedPattern);
  
    await keyGenPage.showHideKey(row);
    await expect(keyCell).not.toHaveText(nonEncryptedPattern);
  
    await keyGenPage.showHideKey(row);
    await expect(keyCell).toHaveText(encryptedPattern);
  });
  
  test('should update the Key name and type', async ({ keyGenPage }) => {
    const keyName = await keyGenPage.findFirstKey();
    const newKeyName = `Updated ${keyName}`;
  
    await keyGenPage.editKeyName(keyName, newKeyName);
    await expect(keyGenPage.getToastByAction("updated")).toBeVisible();
  
    const updatedRow = await keyGenPage.getKeyRow(newKeyName);
    await expect(updatedRow).toBeAttached();
  
    await keyGenPage.editKeyType(newKeyName, 'Production');
    await expect(keyGenPage.getToastByAction("updated")).toBeVisible();
    await expect(updatedRow).toContainText('Prod');
  });
  
  test('should delete a Key', async ({ keyGenPage }) => {
    const keyName = await keyGenPage.findFirstKey();
    await keyGenPage.deleteKey(keyName);
  
    await expect(keyGenPage.getToastByAction("deleted")).toBeVisible();
    const deletedRow = await keyGenPage.getKeyRow(keyName)
    await expect(deletedRow).not.toBeAttached();
  });
  
});
