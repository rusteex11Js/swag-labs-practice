export class CartPage {
  constructor(page) {
    this.page = page;

    this.checkoutButton = page.locator("#checkout");
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
