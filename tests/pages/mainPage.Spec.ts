import { test, expect, Locator, Page } from '@playwright/test';
import { validateHeaderName } from 'http';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage;

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.OpenMainPage();
  });

  test('Проверка отображения элементов навигации хэдера', async () => {
    await mainPage.checkElementsVisability();
  });

  test('Проверка названий элементов навигации хэдера', async () => {
    await mainPage.checkElementsText();
  });

  test('Проверка атрибутов href навигации хэдера', async () => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('Проверка переключения лайт-мода', async () => {
    test.step('Два клика на иконку переключения лайт-мода', async () => {
      await mainPage.clickSwitchLightModeIkon();
      await mainPage.clickSwitchLightModeIkon();
    });
    test.step('Проверка смены значения атрибута', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test('Проверка заголовка', async ({ page }) => {
    await mainPage.headingIsVisible();
    await mainPage.headingHasExpectedText();
  });

  test('Проверка кнопки GetStarted', async ({ page }) => {
    await test.step('Заголовок кнопки GetStarted отображается', async () => {
      await mainPage.buttonGetStartedIsVisible();
    });
    await test.step('На кнопке есть текст Get started', async () => {
      await mainPage.buttonGetStartedContainsText();
    });
    await test.step('Кнопка - это ссылка на docs/intro', async () => {
      await mainPage.buttonGetStartedHasAttributeHref();
    });
  });

  test(`Проверка  стилей со светлой темой`, async () => {
    await test.step('Установка светлой темы', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Скриншотная проверка с активной светлой темой', async () => {
      await mainPage.checkLayoutwithLightMode;
    });
  });

  test(`Проверка  стилей c темной темой`, async () => {
    await test.step('Установка темной темы', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Скриншотная проверка с активной темной темой', async () => {
      await mainPage.checkLayoutwithDarkMode();
    });
  });
});
