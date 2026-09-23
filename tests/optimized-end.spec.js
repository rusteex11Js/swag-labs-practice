import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { OrderCompletePage } from "../pages/OrderCompletePage";

let page;
let loginPage;
let inventoryPage;
let cartPage;
let checkoutPage;
let orderCompletePage;

test.beforeEach(async ({ browser }) => {
  const context = await browser.newContext();

  page = await context.newPage();

  // Initialize Page Objects
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  orderCompletePage = new OrderCompletePage(page);

  // Open application
  await loginPage.goto();

  // Login
  await loginPage.login(
    "standard_user",
    "secret_sauce"
  );
});

test.afterEach(async () => {
  await page.context().close();
});

test.skip("End to End - Purchase Product", async () => {

  // Verify inventory page
  await expect(page).toHaveTitle("Swag Labs");
  await expect(page.locator(".app_logo")).toHaveText(
    "Swag Labs"
  );

  // Add product
  await inventoryPage.addProductToCart(
    "Sauce Labs Fleece Jacket"
  );

  // Go to cart
  await inventoryPage.goToCart();

  // Checkout
  await cartPage.checkout();

  // Enter customer details
  await checkoutPage.enterCustomerDetails(
    "Vinoth",
    "vijayabaskaran",
    "600097"
  );

  // Continue
  await checkoutPage.continueToOverview();

  // Finish order
  await checkoutPage.finishOrder();

  // Download PDF
  const download =
    await orderCompletePage.downloadOrderPdf();

  await download.saveAs(
    `C:\\Users\\Vinot\\Desktop\\Playwright Batch Notes\\playwright-session\\download\\${download.suggestedFilename()}`
  );
});