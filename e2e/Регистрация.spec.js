//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');

test('автоматическая авторизация и проверка', async ({ browser }) => {
  // Создаем контекст с авторизацией
  const context = await browser.newContext({
    httpCredentials: {
      username: 'edtech',    // замените на ваш логин
      password: 'EdTech2018',   // замените на ваш пароль
    },
  });
  
  const page = await context.newPage();

  // Переход по ссылке, автоматический вход
  await page.goto('https://lc-edtech.apps.okd.stage.digital.rt.ru/signup');

});