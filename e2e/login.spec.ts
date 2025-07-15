import { test, expect } from '../fixtures/fixtures';
import { credentials } from './credentials.ts'; // иногда помогает явно указать расширение

test.describe("1", ()=> {
test('Заблокированный пользователь', async ({ loginPage, page }) => {
  await loginPage.loginLockedOutUser(credentials.password);
  const errorText = await loginPage.getErrorText();
  expect(errorText).toContain('Sorry, this user has been locked out.');
});

test('Проблемный пользователь', async ({ loginPage, page }) => {
  await loginPage.loginProblemUser(credentials.password);
  await expect(page.locator('[data-test="title"]')).toBeVisible();
});

test('Пользователь с глюками производительности', async ({ loginPage, page }) => {
  await loginPage.loginPerformanceGlitchUser(credentials.password);
  await expect(page.getByText('carry.allTheThings() with the')).toBeVisible();
});

test('Пользователь – ошибка', async ({ loginPage, page }) => {
  await loginPage.loginErrorUser(credentials.password);
  await expect(page.getByText("Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel")).toBeVisible();
});

test('Визуальный пользователь', async ({ loginPage, page }) => {
  await loginPage.loginVisualUser(credentials.password);
  await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
});
});

