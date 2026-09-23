import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { OrderCompletePage } from "../pages/OrderCompletePage";

let context;
let page;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
});

test.afterAll(async () => {
  await context.close();
});

test.describe("smoke test", async() =>{

    test("test 1 end to end", async () => {
  // Create Page Objects
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const orderCompletePage = new OrderCompletePage(page);

  // Login
  await loginPage.goto();

  await expect(page).toHaveTitle("Swag Labs");

  await loginPage.login("standard_user", "secret_sauce");

 
});

test("test 2 end to end", async () => {
  // Create Page Objects
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const orderCompletePage = new OrderCompletePage(page);

  // Login
//   await loginPage.goto();

//   await expect(page).toHaveTitle("Swag Labs");

//   await loginPage.login("standard_user", "secret_sauce");

  // Inventory
  await expect(page.locator(".app_logo")).toHaveText("Swag Labs");

  await inventoryPage.addProductToCart("Sauce Labs Fleece Jacket");

  await inventoryPage.goToCart();

  // Cart
  await cartPage.checkout();

  // Checkout
  await checkoutPage.enterCustomerDetails("Vinoth", "vijayabaskaran", "600097");

  await checkoutPage.continueToOverview();

  await checkoutPage.finishOrder();

  // Download PDF
  const download = await orderCompletePage.downloadOrderPdf();

  await download.saveAs(
    `C:\\Users\\Vinot\\Desktop\\Playwright Batch Notes\\playwright-session\\download\\${download.suggestedFilename()}`,
  );
});
})


