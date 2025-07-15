import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = this.page.locator('.cart_item');
  }

  async getItemsCount() {
    return this.cartItems.count();
  }

  async removeItem(index: number) {
    await this.cartItems.nth(index).locator('button').click();
  }

  async isEmpty() {
    return (await this.cartItems.count()) === 0;
  }

  async clickCheckout() {
    await this.page.click('.checkout_button');
  }
}