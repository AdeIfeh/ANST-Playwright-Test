import { test , expect} from '@playwright/test'


test('login test', async ({page}) => {
//const context = await browser.newContext()
//const page = await context.newPage()

await page.goto('https://www.saucedemo.com/')

await page.locator('.form_input').nth(0).fill('standard_user')
await page.locator('.form_input').nth(1).fill('secret_sauce')
await page.locator('#login-button').click()
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
await expect(page.locator('.inventory_list')).toBeVisible()

// Verify that the Add to Cart button is visible
await expect(page.locator('.btn_inventory').nth(1)).toBeVisible()
await expect(page.locator('.btn_inventory').nth(3)).toBeVisible()

// Verify that the Add to Cart button is clickable
await page.locator('.btn_inventory').nth(1).click()
await page.locator('.btn_inventory').nth(3).click()

//Verification that the shopping cart badge is updated to 2
await expect(page.locator('.shopping_cart_badge')).toHaveText('2')
// Validate that the shopping cart is visible and clickable
const Cart = page.locator('div.shopping_cart_container')
await expect(Cart).toBeVisible()
await Cart.click()

//Validate that the Cart page contains the expected Items
await page.waitForSelector('.cart_item')
await expect(page.locator('.cart_item').nth(0)).toBeVisible()
await expect(page.locator('.cart_item').nth(1)).toBeVisible()

await page.pause()
})