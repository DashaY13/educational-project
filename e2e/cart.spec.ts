import { authedTest, expect } from '../fixtures/fixtures';

authedTest('Добавление первого товара в корзину', async ({ loginPage, cartPage }) => {
  await cartPage.addItemToCart(0);
  const badgeText = await cartPage.getCartBadgeText();
  await expect(badgeText).toBe('1');
});

authedTest('Добавление второго товара в корзину', async ({ loginPage, cartPage }) => {
  await cartPage.addItemToCart(0);
  await cartPage.addItemToCart(1);
  const badgeText = await cartPage.getCartBadgeText();
  await expect(badgeText).toBe('2');
});

authedTest('Удаление товаров из корзины', async ({ loginPage, cartPage }) => {
  await cartPage.addItemToCart(0);
  await cartPage.addItemToCart(1);
  await cartPage.goToCart();
  await cartPage.removeItem(0);
  const itemsCount = await cartPage.getItemsCount();
  await expect(itemsCount).toBe(1);
  await cartPage.removeItem(0);
  const itemsCountAfterRemoval = await cartPage.getItemsCount();
  await expect(itemsCountAfterRemoval).toBe(0);
});

authedTest('Проверка содержимого корзины', async ({ loginPage, cartPage }) => {
  await cartPage.addItemToCart(0);
  await cartPage.addItemToCart(1);
  await cartPage.goToCart();

  // Проверяем количество товаров
  const itemsCount = await cartPage.getItemsCount();
  await expect(itemsCount).toBe(2);

  // Проверяем названия товаров
  const firstItemName = await cartPage.getItemName(0);
  const secondItemName = await cartPage.getItemName(1);
  await expect(firstItemName).toBeTruthy();
  await expect(secondItemName).toBeTruthy();
});

authedTest('Проверка содержимого корзины после добавления товаров', async ({ loginPage, cartPage }) => {
  // Получаем названия товаров до добавления в корзину
  const firstItemName = await loginPage.page.locator('.inventory_item').nth(0).locator('.inventory_item_name').innerText();
  const secondItemName = await loginPage.page.locator('.inventory_item').nth(1).locator('.inventory_item_name').innerText();

  // Добавляем товары в корзину
  await cartPage.addItemToCart(0);
  await cartPage.addItemToCart(1);

  // Переходим в корзину
  await cartPage.goToCart();

  // Проверяем количество товаров в корзине
  const itemsCount = await cartPage.getItemsCount();
  await expect(itemsCount).toBe(2);

  // Проверяем названия товаров в корзине
  const firstCartItemName = await cartPage.getItemName(0);
  const secondCartItemName = await cartPage.getItemName(1);
  await expect(firstCartItemName).toBe(firstItemName);
  await expect(secondCartItemName).toBe(secondItemName);
});