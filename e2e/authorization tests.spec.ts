import { test, expect } from '@playwright/test';
import { credentials } from 'C:\Users\darya.ustimova\.vscode\playwright\e2e\credentials.ts'; // ваш файл

const userPassword = 'secret_sauce';

// Общая функция входа
async function login(page, username, password) {
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', password);
    await page.click('[data-test="login-button"]');
}

// Перед каждым тестом переходим на страницу
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
});

// Тесты с разными пользователями
test('authorization under standard user', async ({ page }) => {
    await login(page, 'standard_user', userPassword);
    await expect(page.locator('[data-test="title"]')).toBeVisible();
});

test('authorization under locked out user', async ({ page }) => {
    await login(page, 'locked_out_user', userPassword);
    await expect(page.locator('[data-test="error"]')).toContainText(
        'Epic sadface: Sorry, this user has been locked out.'
    );
});

test('authorization under problem user', async ({ page }) => {
    await login(page, 'problem_user', userPassword);
    await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
});

test('authorization under performance glitch user', async ({ page }) => {
    await login(page, 'performance_glitch_user', userPassword);
    // Проверка текста, который появляется после входа
    await expect(page.getByText('carry.allTheThings() with the')).toBeVisible();
});

test('authorization under error user', async ({ page }) => {
    await login(page, 'error_user', userPassword);
    await expect(page.locator('[data-test="title"]')).toBeVisible();
});

test('authorization under visual user', async ({ page }) => {
    await login(page, 'visual_user', userPassword);
    await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
});
test('Авторизация стандартным пользователем', async ({ loginPage, page }) => {
  await loginPage.loginStandardUser(credentials.password);
  await expect(page.locator('[data-test="title"]')).toBeVisible();
});
