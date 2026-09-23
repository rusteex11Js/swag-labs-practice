import {configData} from "../config/global.config.js";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.loginButton = page.locator("#login-button");
  }

  async goto() {
    await this.page.goto(configData.baseurl);
  }

  async login(username,password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
