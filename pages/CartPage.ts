import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = this.page.locator('.cart_item');
    this.shoppingCartBadge = this.page.locator('.shopping_cart_badge');
  }

  async addItemToCart(index: number) {
    await this.page.locator('.inventory_item').nth(index).locator('button').click();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async removeItem(index: number) {
    await this.cartItems.nth(index).locator('button').click();
  }

  async getItemsCount() {
    return this.cartItems.count();
  }

  async getItemName(index: number) {
    return this.cartItems.nth(index).locator('.inventory_item_name').innerText();
  }

  async getCartBadgeText() {
    return this.shoppingCartBadge.innerText();
  }
}