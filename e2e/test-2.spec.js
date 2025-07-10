const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
//const url = 'https://lc-edtech.apps.okd.stage.digital.rt.ru/signup'
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
  let userSurname = faker.person.lastName('female'); // 'Grady'
  let userName = faker.person.firstName('female'); // 'Victoria'
  let userPhon = faker.phone.number({ style: 'national' }); // '(961) 770-7727'
  let userEmail = faker.internet.email(); // 'Kassandra4@hotmail.com'
  let userPassword = faker.internet.password(); // '89G1wJuBLbGziIs'
  const inputCode = await page.locator('input[name="code"]');
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
  
  // "мокаем" капчу до перехода
  await page.route('https://captcha-api.yandex.ru/check?host=lc-edtech.apps.okd.stage.digital.rt.ru&sitekey=ysc1_33b7ACv0ALPD696wDT5iuXXBnOqZfpnv1ONHhpSv5ac382ca&href=https%3A%2F%2Flc-edtech.apps.okd.stage.digital.rt.ru%2Fsignup', route => {
    route.fulfill({
      status: 200,
      contentType: 'image/png',
      body: Buffer.from(''), // пустое тело
    });
  });
  // Вставьте сюда перед кликом
await page.locator('.rtr-root.styles__button__n9P6r.styles__submitButton__OnjSg').scrollIntoViewIfNeeded();

await page.evaluate(() => {
  document.querySelector('.rtr-root.styles__button__n9P6r.styles__submitButton__OnjSg')?.click();
});

await page.evaluate(() => {
  document.querySelectorAll('.overlay-selector, .modal-background').forEach(el => {
    el.style.display = 'none';
  });
});
  await page.getByText('Продолжить').click();
  await page.screenshot({ path: 'post_click.png', fullPage: true });
  console.log('Кнопка видима:', await page.getByText('Продолжить', { exact: true }).isVisible());
  console.log('Кнопка активна:', await page.getByText('Продолжить', { exact: true }).isEnabled());

  
  const btn = page.locator('.rtr-root.styles__button__n9P6r.styles__submitButton__OnjSg');
  await btn.scrollIntoViewIfNeeded();
  await page.locator('.rtr-root.styles__button__n9P6r.styles__submitButton__OnjSg').evaluate(node => node.click());
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));


  //await page.waitForSelector('input[name="code"]', { visible: true, timeout: 15000 });
// потом вводим
 // await page.fill('input[name="code"]', '123456');

  await page.locator('input[name="code"]').click();
  await page.locator('input[name="code"]').fill('123456');
  await page.getByText('Завершить регистрацию').click();
  await expect(page).toHaveTitle(/Ростелеком Лицей/);
  const title = await page.title();
  console.log(`Заголовок страницы после входа: ${title}`);
});
  