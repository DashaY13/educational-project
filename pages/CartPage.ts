import { Page, Locator } from '@playwright/test';

   export class CartPage {
     readonly page: Page;
     readonly cartItems: Locator;

     constructor(page: Page) {
       this.page = page;
       this.cartItems = this.page.locator('.cart_item');
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

     async addItemToCart(index: number) {
       await this.page.locator('.inventory_item').nth(index).locator('button').click();
     }

     async goToCart() {
       await this.page.locator('.shopping_cart_link').click();
     }

     async getItemName(index: number) {
       return this.cartItems.nth(index).locator('.inventory_item_name').innerText();
     }

     async getItemsCount() {
       return this.cartItems.count();
     }
   }