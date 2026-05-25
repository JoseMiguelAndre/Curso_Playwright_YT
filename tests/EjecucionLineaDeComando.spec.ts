import {test, expect} from '@playwright/test'
import { loginPage } from './pageObjetcs/loginPage';

test('Test Carrito Automatizado sin pageObjets', async ({page}, testInfo) => {
  await page.goto("https://www.saucedemo.com/");

 
  //CON PAGE OBJECTS ====================================
  const login = new loginPage(page);
  await login.loginWithCredentials("standard_user", "secret_sauce");
  await login.checkSuccessFullLogin();
  //====================================================

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

//Comandos para ejecutar los tests desde la terminal:
/*
npx playwright test -> Ejecutar todos los tests desde la terminal bajo la carpeta "tests"

npx playwright test SauceDemoCarrito.spec.ts -g "Test Carrito Automatizado sin pageObjets" -> Ejecutar un test específico el test se 
identifica por su nombre o parte de su nombre

npx playwright test SauceDemoCarrito.spec.ts -g "Test Carrito Automatizado sin pageObjets" --repeat-each 5 - Repetir un test específico 5 veces

npx playwright test SauceDemoCarrito.spec.ts --grep "Test Carrito Automatizado sin pageObjets" --debug -> Ejecutar un test específico en 
modo debug, esto hará que se abra una ventana de Playwright Inspector donde se podrá ver la ejecución del test paso a paso y 
se podrán agregar breakpoints para detener la ejecución en ciertos puntos y analizar el estado de la aplicación en ese momento.
*/