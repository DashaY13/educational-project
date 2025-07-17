import { authedTest, expect } from '../fixtures/fixtures';

   authedTest('Добавление первого товара в корзину', async ({ loginPage }) => {
     await loginPage.page.locator('.inventory_item').nth(0).locator('button').click();
     await expect(loginPage.page.locator('.shopping_cart_badge')).toHaveText('1');
   });

   authedTest('Добавление второго товара в корзину', async ({ loginPage }) => {
     await loginPage.page.locator('.inventory_item').nth(0).locator('button').click();
     await loginPage.page.locator('.inventory_item').nth(1).locator('button').click();
     await expect(loginPage.page.locator('.shopping_cart_badge')).toHaveText('2');
   });

   authedTest('Удаление товаров из корзины', async ({ loginPage, cartPage }) => {
     await loginPage.page.locator('.inventory_item').nth(0).locator('button').click();
     await loginPage.page.locator('.inventory_item').nth(1).locator('button').click();
     await loginPage.page.locator('.shopping_cart_link').click();
     await cartPage.removeItem(0);
     await expect(cartPage.cartItems).toHaveCount(1);
     await cartPage.removeItem(0);
     await expect(cartPage.cartItems).toHaveCount(0);
   });

   authedTest('Проверка содержимого корзины', async ({ loginPage, cartPage }) => {
     await loginPage.page.locator('.inventory_item').nth(0).locator('button').click();
     await loginPage.page.locator('.inventory_item').nth(1).locator('button').click();
     await loginPage.page.locator('.shopping_cart_link').click();

     // Проверяем количество товаров
     await expect(cartPage.cartItems).toHaveCount(2);

     // Проверяем названия товаров
     const firstItemName = await cartPage.cartItems.nth(0).locator('.inventory_item_name').innerText();
     const secondItemName = await cartPage.cartItems.nth(1).locator('.inventory_item_name').innerText();
     await expect(firstItemName).toBeTruthy();
     await expect(secondItemName).toBeTruthy();
   });

   authedTest('Проверка содержимого корзины после добавления товаров', async ({ loginPage, cartPage }) => {
     // Получаем названия товаров до добавления в корзину
     const firstItemName = await loginPage.page.locator('.inventory_item').nth(0).locator('.inventory_item_name').innerText();
     const secondItemName = await loginPage.page.locator('.inventory_item').nth(1).locator('.inventory_item_name').innerText();

     // Добавляем товары в корзину
     await loginPage.page.locator('.inventory_item').nth(0).locator('button').click();
     await loginPage.page.locator('.inventory_item').nth(1).locator('button').click();

     // Переходим в корзину
     await loginPage.page.locator('.shopping_cart_link').click();

     // Проверяем количество товаров в корзине
     await expect(cartPage.cartItems).toHaveCount(2);

     // Проверяем названия товаров в корзине
     const firstCartItemName = await cartPage.cartItems.nth(0).locator('.inventory_item_name').innerText();
     const secondCartItemName = await cartPage.cartItems.nth(1).locator('.inventory_item_name').innerText();

     // Проверяем соответствие названий
     await expect(firstCartItemName).toBe(firstItemName);
     await expect(secondCartItemName).toBe(secondItemName);
   });