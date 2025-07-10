import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const userPassword = 'secret_sauce';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('Авторизация стандартным пользователем', async ({ page }) => {
  const login = new LoginPage(page);
  await login.loginStandardUser(userPassword);
  // Проверка, что страница с товарами загружена
  await expect(page.locator('[data-test="title"]')).toBeVisible();
});

test('Заблокированный пользователь - показывает ошибку', async ({ page }) => {
  const login = new LoginPage(page);
  await login.loginLockedOutUser(userPassword);
  const errorText = await login.getErrorText();
  expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
});

test('Проблемный пользователь', async ({ page }) => {
  const login = new LoginPage(page);
  await login.loginProblemUser(userPassword);
  await expect(page.locator('[data-test="title"]')).toBeVisible();
});

test('Пользователь с глюками производительности', async ({ page }) => {
  const login = new LoginPage(page);
  await login.loginPerformanceGlitchUser(userPassword);
  await expect(page.getByText('carry.allTheThings() with the')).toBeVisible();
});

test('Пользователь - ошибка', async ({ page }) => {
  const login = new LoginPage(page);
  await login.loginErrorUser(userPassword);
  await expect(page.getByText("Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.")).toBeVisible();
});

test('Визуальный пользователь', async ({ page }) => {
  const login = new LoginPage(page);
  await login.loginVisualUser(userPassword);
  await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
});