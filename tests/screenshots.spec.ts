import {test, expect} from '@playwright/test'
import { loginPage } from './pageObjetcs/loginPage';

test('Test Carrito Automatizado sin pageObjets', async ({page}, testInfo) => {
  await page.goto("https://www.saucedemo.com/");

 
  //CON PAGE OBJECTS ====================================
  const login = new loginPage(page);
  await login.loginWithCredentials("standard_user", "secret_sauce");
  await login.checkSuccessFullLogin();
  //====================================================

  await page.screenshot({path: 'Screenshots/login.png', fullPage: true}); // FORMA 1 DE TOMAR SCREENSHOT
  
  //FORMA 2 DE TOMAR SCREENSHOT ---- Ir a playwright.config.ts y agregar la siguiente linea: "screenshot: 'only-on-failure'" 
  // esto hará que se tome un screenshot solo cuando el test falle, el screenshot se guardará en la carpeta "test-results" que 
  // se genera automáticamente al ejecutar los tests.

  //FORMA 3: Agregando en la función del test, un testInfo y la siguiente línea. Esto hará que se tome un screenshot en cada 
  // ejecución del test, el screenshot se guardará en la carpeta "test-results" con el nombre del test y la fecha de ejecución.
  await testInfo.attach('login3', {
    body: await page.screenshot(),
    contentType: "image/png"
  })






  const itemsContainer =await page.locator("#inventory_container .inventory_item").all();
  const randomIndex = Math.floor(Math.random() * itemsContainer.length);

  const randomItem = itemsContainer[randomIndex];

  const expectedDescription = await randomItem.locator(".inventory_item_desc").innerText();
  const expectedName = await randomItem.locator(".inventory_item_name ").innerText();
  const expectedPrice = await randomItem.locator(".inventory_item_price").innerText();

  console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`);

  await randomItem.getByRole('button', { name: 'Add to cart' }).click();
  await page.locator("//a[@class='shopping_cart_link']").click();

expect(page.getByRole('button', {name:"Checkout"})).toBeVisible();
  
  const actualName = await page.locator(".inventory_item_name").innerText();
  const actualDescription = await page.locator(".inventory_item_desc").innerText();
  const actualPrice = await page.locator(".inventory_item_price").innerText();

  expect(actualName).toEqual(expectedName);
  expect(actualDescription).toEqual(expectedDescription);
  expect(actualPrice).toEqual(expectedPrice);

 await page.getByRole('button', {name: 'Checkout'}).click();
 await page.locator("//input[@placeholder='First Name']").fill("Test");
 await page.locator("#last-name").fill("Test123");
 await page.locator("//input[@data-test='postalCode']").fill("12345");
 await page.getByRole('button', {name: 'Continue'}).click();
 await page.locator("//button[@class='btn btn_action btn_medium cart_button']").click();

 await expect(page.locator("//h2[@class='complete-header']")).toBeVisible();
  const actualMessage = await page.locator("//h2[@class='complete-header']").innerText();
  const expectedMessage = "Thank you for your order!";
  await expect(actualMessage).toEqual(expectedMessage);

});










