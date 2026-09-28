import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { InventoryPage } from "../../pages/InventoryPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { CheckoutPage } from "../../pages/CheckoutPage.js";
import { OrderCompletePage } from "../../pages/OrderCompletePage.js";
import loginData from "../../data/index.js";

import fs from "node:fs";
import * as allure from "allure-js-commons";

let loginPage;
let inventoryPage;
let cartPage;
let checkoutPage;
let orderCompletePage;
let basepage;

test.beforeEach(async ({ page }) => {
  //Test timeout
  test.setTimeout(60000);
  // Create Page Objects
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  orderCompletePage = new OrderCompletePage(page);
  // Login
  await loginPage.goto();
  await expect(page).toHaveTitle("Swag Labs");
  await loginPage.login(loginData.validuser.username, loginData.validuser.password);
  await expect(page.locator(".app_logo")).toHaveText("Swag Labs");
});

test.afterEach(async ({ page }) => {
  // Logout
  await orderCompletePage.logout();
  // Screenshot
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  // await page.screenshot({ path: `reports/screenshot/testcase/${timestamp}.png`, fullPage: true });
});

test(
  "test case 1 - end to end - Sauce Labs Fleece Jacket",
  { timeout: 30000, tag: ["@smoke", "@reg"] },
  async ({}, testInfo) => {
    test.slow();
    // Inventory
    await inventoryPage.addProductToCart("Sauce Labs Fleece Jacket");
    await inventoryPage.goToCart();
    // Cart
    await cartPage.checkout();
    // Checkout
    await checkoutPage.enterCustomerDetails(
      "Vinoth",
      "vijayabaskaran",
      "600097",
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();
    // Download PDF
    const download = await orderCompletePage.downloadOrderPdf();

    const filePath = testInfo.outputPath(download.suggestedFilename());
    await download.saveAs(filePath);
    // await download.saveAs(`reports/download/${download.suggestedFilename()}`);
    await allure.attachment(
      download.suggestedFilename(),
      await fs.promises.readFile(filePath),
      "application/pdf",
    );
  },
);

test(
  "test case 2 - end to end - Sauce Labs Bolt T-Shirt",
  { tag: ["@sanity", "@reg"] },
  async () => {
    // Inventory
    await inventoryPage.addProductToCart("Sauce Labs Bolt T-Shirt");
    await inventoryPage.goToCart();
    // Cart
    await cartPage.checkout();
    // Checkout
    await checkoutPage.enterCustomerDetails(
      "Vinoth",
      "vijayabaskaran",
      "600097",
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();
    // Download PDF
    const download = await orderCompletePage.downloadOrderPdf();
    await download.saveAs(`download/${download.suggestedFilename()}`);
  },
);
