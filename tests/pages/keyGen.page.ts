import { Page, Locator, expect } from '@playwright/test';

export class KeyGenPage {
  readonly page: Page;
  readonly addNewKeyButton: Locator;
  readonly keyNameInput: Locator;
  readonly newKeyTypeSelect: Locator;
  readonly createButton: Locator;
  readonly editButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly deleteRowButton: Locator;
  readonly cancelButton: Locator;
  readonly keyPrefix: string = 'JBK-Key-';

  constructor(page: Page) {
    this.page = page;
    this.addNewKeyButton = page.getByRole('button', { name: '+ Create New Key' });
    this.keyNameInput = page.getByPlaceholder('Enter the key name');
    this.newKeyTypeSelect = page.getByLabel('Environment');
    this.createButton = page.getByRole('button', { name: 'Create API Key' });
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.deleteRowButton = page.getByRole('button', { name: 'Delete' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Delete', exact: true });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async goto() {
    await this.page.goto('http://localhost:3000/playground');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async createKey(keyName: string, keyType: 'Development' | 'Production' | 'Testing' = 'Testing') {
    await this.addNewKeyButton.click();
    await this.keyNameInput.fill(keyName);
    await this.newKeyTypeSelect.selectOption(keyType);
    await this.createButton.click();
  }

  async getKeyRow(keyName: string) {
    return this.page.locator('tr', { hasText: keyName });
  }

  async findFirstKey() {
    const baseRow = await this.getKeyRow(this.keyPrefix);
    const nameCell = baseRow.locator('td').first();
    const keyName = await nameCell.innerText();
    return keyName;
  }

  async getKeyCell(row: Locator) {
    return row.getByText(this.keyPrefix);
  }

  async showHideKey(row: Locator) {
    const toggleBtn = row.getByRole('button', { name: 'Show/Hide Key' });
    await toggleBtn.click();
  }

  async editKeyName(keyName: string, newName: string) {
    const initialRow = await this.getKeyRow(keyName);
    const editBtn = initialRow.getByRole('button', { name: 'Edit' });
    await editBtn.click();
    
    const nameInput = this.page.getByRole('textbox');
    await nameInput.fill(newName);
    await nameInput.press('Enter');
  }

  async editKeyType(keyName: string, newType: 'Development' | 'Production' | 'Testing') {
    const initialRow = await this.getKeyRow(keyName);
    const editBtn = initialRow.getByRole('button', { name: 'Edit' });
    await editBtn.click();
    
    const typeSelect = this.page.getByRole('combobox');
    await typeSelect.selectOption(newType);
    await typeSelect.press('Enter');
  }

  async deleteKey(keyName: string) {
    const row = await this.getKeyRow(keyName);
    const deleteBtn = row.getByRole('button', { name: 'Delete' });
    await deleteBtn.click();
    await expect(this.page.getByRole('heading', { name: 'Confirm Deletion' })).toBeVisible();
    await this.confirmDeleteButton.click();
  }

  async updateKeyUsage(keyName: string, usage: number) {
    const row = await this.getKeyRow(keyName);
    const usageCell = row.locator('td').nth(2);
    await usageCell.click();
    const usageInput = usageCell.locator('input');
    await usageInput.fill(usage.toString());
    await usageInput.press('Enter');
    await expect(this.getToastByAction("updated")).toBeVisible();
  }

  getToastByAction(action: 'created' | 'updated' | 'deleted'): Locator {
    return this.page.getByText(`API Key ${action} successfully!`, { exact: true });
  }
}
