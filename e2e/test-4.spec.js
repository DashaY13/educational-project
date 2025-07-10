const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test('автоматическая авторизация и проверка', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: 'edtech',
      password: 'EdTech2018',
    },
  });
  const page = await context.newPage();

  // Переход на страницу
  await page.goto('https://lc-edtech.apps.okd.stage.digital.rt.ru/signup');

  // Генерируем тестовые данные
  const userSurname = faker.person.lastName('female');
  const userName = faker.person.firstName('female');
  const userPhon = faker.phone.number({ style: 'national' });
  const userEmail = faker.internet.email();
  const userPassword = faker.internet.password();

  // Заполняем форму
  await page.locator('input[name="lastname"]').click;
  await page.locator('input[name="lastname"]').fill(userSurname);
  await page.locator('input[name="firstname"]').click;
  await page.locator('input[name="firstname"]').fill(userName);
  await page.locator('input[name="phone"]').click;
  await page.locator('input[name="phone"]').fill(userPhon);
  await page.getByText('Продолжить', { exact: true }).click();
  await page.locator('input[name="email"]').click;
  await page.locator('input[name="email"]').fill(userEmail);
  await page.getByText('КлассКласс').click();
  await page.getByRole('option', { name: '2 класс' }).click();
  await page.locator('input[name="password"]').click;
  await page.locator('input[name="password"]').fill(userPassword);

   
   // Скроллируем к кнопке и делаем принудительный клик
  const btn = page.locator('.rtr-root.styles__button__n9P6r.styles__submitButton__OnjSg');
  await btn.scrollIntoViewIfNeeded();

    // Принудительно клик через evaluate
  await btn.evaluate(node => node.click());
  await page.screenshot({ path: 'after_click.png', fullPage: true });

   // "мокаем" капчу до перехода
   await page.route('https://captcha-api.yandex.ru/check?host=lc-edtech.apps.okd.stage.digital.rt.ru&sitekey=ysc1_33b7ACv0ALPD696wDT5iuXXBnOqZfpnv1ONHhpSv5ac382ca&href=https%3A%2F%2Flc-edtech.apps.okd.stage.digital.rt.ru%2Fsignup', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ result: 'ok' }), // сайт будет считать, что капча решена
    });
  });

  // Ждём появления следующего шага (например, поля для кода)
  await page.waitForSelector('input[name="code"]', { visible: true, timeout: 20000 });

  // Вводим код
  await page.fill('input[name="code"]', '123456');

  // Завершаем регистрацию
  await page.getByText('Завершить регистрацию').click();

  // Проверка финальной страницы
  await expect(page).toHaveTitle(/Ростелеком Лицей/);
  const title = await page.title();
  console.log(`Заголовок после регистрации: ${title}`);
});