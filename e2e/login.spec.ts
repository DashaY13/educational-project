import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';            
import { credentials } from './credentials';

let login: LoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  login = new LoginPage(page);
});

// Тест 1: Стандартный пользователь
test('Авторизация стандартным пользователем', async ({ page }) => {
  await login.loginStandardUser(credentials.password);
  await expect(page.locator('[data-test="title"]')).toBeVisible();
});

// Тест 2: Заблокированный пользователь
test('Заблокированный пользователь - показывает ошибку', async ({ page }) => {
  await login.loginLockedOutUser(credentials.password);
  const errorText = await login.getErrorText();
  expect(errorText).toContain('Sorry, this user has been locked out.');
});

// Тест 3: Проблемный пользователь
test('Проблемный пользователь авторизация', async ({ page }) => {
  await login.loginProblemUser(credentials.password);
  await expect(page.locator('[data-test="title"]')).toBeVisible();
});

// Тест 4: Пользователь с глюками производительности
test('Пользователь с глюками производительности', async ({ page }) => {
  await login.loginPerformanceGlitchUser(credentials.password);
  await expect(page.getByText('carry.allTheThings() with the')).toBeVisible();
});

// Тест 5: Пользователь – ошибка
test('Пользователь - ошибка', async ({ page }) => {
  await login.loginErrorUser(credentials.password);
  await expect(page.getByText("Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.")).toBeVisible();
});

// Тест 6: Визуальный пользователь
test('Визуальный пользователь', async ({ page }) => {
  await login.loginVisualUser(credentials.password);
  await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
});