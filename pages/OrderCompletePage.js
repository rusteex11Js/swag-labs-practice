export class OrderCompletePage {
  constructor(page) {
    this.page = page;

    this.generatePdfButton = page.locator("#generate-pdf-order");
    this.handBurger = page.locator("#react-burger-menu-btn");
    this.logoutbtn = page.locator("#logout_sidebar_link");
  }

  async downloadOrderPdf() {
    const downloadPromise = this.page.waitForEvent("download");
    await this.generatePdfButton.click();
    return await downloadPromise;
  }

  async logout() {
    await this.handBurger.click();
    await this.logoutbtn.click();
  }
}
