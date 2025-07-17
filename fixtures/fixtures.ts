import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

type MyFixtures = {
  loginPage: LoginPage;
  cartPage: CartPage;
  page: Page;
};

// Базовая фикстура
export const test = base.extend<MyFixtures>({
  page: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await use(page);
    await context.close(); // Закрываем контекст после завершения использования страницы
  },

  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto(); // Переход на страницу логина
    await use(login);
  },

  cartPage: async ({ page }, use) => {
    const cart = new CartPage(page);
    await use(cart);
  },
});

// Фикстура с предусловием (авторизация)
export const authedTest = test.extend({
  loginPage: async ({ loginPage }, use) => {
    // Логин пользователя
    await loginPage.login('standard_user', 'secret_sauce');

    // Проверка URL после логина
    await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html', { timeout: 10000 });

    // Явное ожидание элемента
    await loginPage.page.waitForSelector('.inventory_list', { state: 'visible', timeout: 10000 });

    // Проверка загрузки страницы
    await expect(loginPage.page.locator('.inventory_list')).toBeVisible();

    // Использование фикстуры
    await use(loginPage);
  },
});

export { expect };