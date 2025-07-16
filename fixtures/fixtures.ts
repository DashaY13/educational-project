// fixtures/fixtures.ts
import { test as base, expect, Page } from '@playwright/test';
   import { LoginPage } from '../pages/LoginPage';
   import { CartPage } from '../pages/CartPage';

   type MyFixtures = {
     loginPage: LoginPage;
     cartPage: CartPage;
     page: Page;
   };

   export const test = base.extend<MyFixtures>({
     page: async ({ browser }, use) => {
       const context = await browser.newContext();
       const page = await context.newPage();
       await use(page);
     },
     
     loginPage: async ({ page }, use) => {
       const login = new LoginPage(page);
       await login.goto();
       await use(login);
     },
     cartPage: async ({ page }, use) => {
       const cart = new CartPage(page);
       await use(cart);
     },
   });

   export { expect };