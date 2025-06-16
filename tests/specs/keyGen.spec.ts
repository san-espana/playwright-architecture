import { test, expect  } from '@playwright/test';


test.describe("API Key-Gen Suit", ()=>{
  const keyPrefix = "JBK-Key"

  test.beforeEach(async({page})=>{
      await page.goto("http://localhost:3000/")
      await page.getByRole("button",{name:"Go to Testing Playground"}).click()
  })

  test("Create API Key",async ({page})=>{
    await page.getByRole("button",{name:"Create New Key"}).click()    

    const keyName = `Test Key #${Math.floor(Math.random()*1000)}`
    await page.getByPlaceholder("Enter the key name").fill(keyName)
    await page.getByLabel('Environment').selectOption('prod')
    await page.getByRole("button",{name:"Create API Key"}).click()

    const toast = page.getByText("API Key created successfully!", {exact: true})
    await expect(toast).toBeVisible()
    expect(await page.getByText(keyName)).toBeVisible()
  })

  test("Show and Hide One Key",async ({page})=>{
    const baseRow = page.locator("tr", { hasText: keyPrefix }).first()
    const nameCell = baseRow.locator("td").first();
    const keyName = await nameCell.innerText();
    const row = page.locator("tr", { hasText: keyName }).first()

    const encryptedPattern = new RegExp(`^${keyPrefix}-[a-zA-Z0-9]{2}\\*+$`);
    const nonEncryptedPattern = new RegExp(/^\*+$/);
    const keyCell = row.getByText(keyPrefix)

    await expect(keyCell).toHaveText(encryptedPattern)

    const toggleBtn = row.getByRole("button", { name: "Show/Hide Key" })

    await toggleBtn.click();
    await expect(keyCell).not.toHaveText(nonEncryptedPattern)

    await toggleBtn.click();
    await expect(keyCell).toHaveText(encryptedPattern)
  })

  test("Update Key Name", async ({page})=>{
    const baseRow = page.locator("tr", { hasText: keyPrefix }).first()
    const nameCell = baseRow.locator("td").first();
    const keyName = await nameCell.innerText();
    const row = page.locator("tr", { hasText: keyName }).first()

    const editButton = row.getByRole("button",{name:"Edit Key"})
    await editButton.click()

    const nameInput = page.getByRole("textbox")
    const typeInput = page.locator("select")

    const currentName = await nameInput.inputValue()
    const currentType = await typeInput.inputValue()

    await expect(currentName).toEqual(keyName)
    const newName = `Updated ${currentName}`
    const newType = 'prod'
    
    await nameInput.fill(newName)
    await typeInput.selectOption(newType);
    await nameInput.press('Enter');

    const updatedRow = page.locator("tr", { hasText: newName }).first()
    const displayedName = updatedRow.getByText(newName);
    const displayedType = updatedRow.getByText(newType);
    
    await expect(displayedName).toBeAttached()
    await expect(displayedType).toBeAttached();
  })

  test("Delete First Key",async ({page})=>{
      const baseRow = page.locator("tr", { hasText: keyPrefix }).first()
      const nameCell = baseRow.locator("td").first();
      const keyName = await nameCell.innerText();
      const row = page.locator("tr", { hasText: keyName }).first()

      const deleteButton = row.getByRole("button",{name:"Delete Key"}).first()
      const modalDeleteButton = page.getByRole("button",{name:"Delete", exact: true})

      await deleteButton.click()
      await modalDeleteButton.click()
      
      const toast = page.getByText("API Key deleted successfully!");
      await toast.waitFor();
      await expect(toast).toBeVisible();
      await expect(row).not.toBeVisible()
  })
})