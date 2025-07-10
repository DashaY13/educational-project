import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Инициализация локаторов внутри конструктора
    this.usernameInput = this.page.locator('[data-test="username"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.locator('[data-test="login-button"]');
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  // Общий метод для входа
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Специальные методы для разных сценариев
  async loginStandardUser(password: string): Promise<void> {
    await this.login('standard_user', password);
  }

  async loginLockedOutUser(password: string): Promise<void> {
    await this.login('locked_out_user', password);
  }

  async loginProblemUser(password: string): Promise<void> {
    await this.login('problem_user', password);
  }

  async loginPerformanceGlitchUser(password: string): Promise<void> {
    await this.login('performance_glitch_user', password);
  }

  async loginErrorUser(password: string): Promise<void> {
    await this.login('error_user', password);
  }

  async loginVisualUser(password: string): Promise<void> {
    await this.login('visual_user', password);
  }

  // Получение текста ошибки (если есть)
  async getErrorText(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
}