import { test, expect } from '../fixtures/fixtures';

test.describe('Тесты для корзины', () => {
  test.beforeEach(async ({ page }) => {
    // Переход на страницу логина
    await page.goto('https://www.saucedemo.com');

    // Проверка загрузки страницы логина
    await page.waitForSelector('[data-test="username"]', { state: 'visible', timeout: 15000 });

    // Логин пользователя
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Проверка URL после логина
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html', { timeout: 10000 });

    // Явное ожидание элемента
    await page.waitForSelector('.inventory_list', { state: 'visible', timeout: 10000 });

    // Проверка загрузки страницы
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

test('Добавление первого товара в корзину', async ({ cartPage, page }) => {
     // Добавление товара в корзину
     await cartPage.addItemToCart(0);

     // Проверка количества товаров в корзине
     await expect(cartPage.page.locator('.shopping_cart_badge')).toHaveText('1');
   });

   test('Добавление второго товара в корзину', async ({ cartPage, page }) => {
     // Проверка загрузки страницы
     await expect(page.locator('.inventory_list')).toBeVisible();

     // Добавление товаров в корзину
     await cartPage.addItemToCart(0);
     await cartPage.addItemToCart(1);

     // Проверка количества товаров в корзине
     await expect(cartPage.page.locator('.shopping_cart_badge')).toHaveText('2');
   });

   test('Удаление товаров из корзины', async ({ cartPage, page }) => {
     // Проверка загрузки страницы
     await expect(page.locator('.inventory_list')).toBeVisible();

     // Добавление товаров в корзину
     await cartPage.addItemToCart(0);
     await cartPage.addItemToCart(1);

     // Переход в корзину
     await cartPage.goToCart();

     // Удаление товаров из корзины
     await cartPage.removeItem(0);
     await expect(cartPage.cartItems).toHaveCount(1);
     await cartPage.removeItem(0);
     await expect(cartPage.cartItems).toHaveCount(0);
   });

   test('Проверка содержимого корзины', async ({ cartPage, page }) => {
     // Проверка загрузки страницы
     await expect(page.locator('.inventory_list')).toBeVisible();

     // Добавление товаров в корзину
     await cartPage.addItemToCart(0);
     await cartPage.addItemToCart(1);

     // Переход в корзину
     await cartPage.goToCart();

     // Проверка количества товаров
     await expect(cartPage.cartItems).toHaveCount(2);

     // Проверка названий товаров
     const firstItemName = await cartPage.getItemName(0);
     const secondItemName = await cartPage.getItemName(1);
     await expect(firstItemName).toBeTruthy();
     await expect(secondItemName).toBeTruthy();
   });

   test('Проверка содержимого корзины после добавления товаров', async ({ cartPage, page }) => {
     // Проверка загрузки страницы
     await expect(page.locator('.inventory_list')).toBeVisible();

     // Получаем названия товаров до добавления в корзину
     const firstItemName = await cartPage.page.locator('.inventory_item').nth(0).locator('.inventory_item_name').innerText();
     const secondItemName = await cartPage.page.locator('.inventory_item').nth(1).locator('.inventory_item_name').innerText();

     // Добавляем товары в корзину
     await cartPage.addItemToCart(0);
     await cartPage.addItemToCart(1);

     // Переходим в корзину
     await cartPage.goToCart();

     // Проверяем количество товаров в корзине
     await expect(cartPage.cartItems).toHaveCount(2);

     // Проверяем названия товаров в корзине
     const firstCartItemName = await cartPage.getItemName(0);
     const secondCartItemName = await cartPage.getItemName(1);
     await expect(firstCartItemName).toBe(firstItemName);
     await expect(secondCartItemName).toBe(secondItemName);
   });
   });