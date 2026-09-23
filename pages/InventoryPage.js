export class InventoryPage {
  constructor(page) {
    this.page = page;

    this.products = page.locator(".inventory_item_name");
    this.productButtons = page.locator(
      ".inventory_item_description .btn"
    );
    this.cartLink = page.locator(".shopping_cart_link");
  }

  async addProductToCart(productName) {
    const productCount = await this.products.count();

    for (let i = 0; i < productCount; i++) {
      const name = await this.products.nth(i).textContent();

      if (name?.trim() === productName) {
        await this.productButtons.nth(i).click();
        return;
      }
    }

    throw new Error(`Product not found: ${productName}`);
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
