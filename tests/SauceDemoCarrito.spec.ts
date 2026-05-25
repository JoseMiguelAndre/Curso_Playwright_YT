import {test, expect} from '@playwright/test'
import { loginPage } from './pageObjetcs/loginPage';

test('Test Carrito Automatizado sin pageObjets', async ({page}) => {
  await page.goto("https://www.saucedemo.com/");

  /*
  await page.getByRole('textbox', {name: "Username"}).fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.locator("//input[@type='submit']").click();
  */
 
  //CON PAGE OBJECTS ====================================
  const login = new loginPage(page);
  await login.loginWithCredentials("standard_user", "secret_sauce");
  await login.checkSuccessFullLogin();
  //====================================================

  await page.screenshot({path: 'Screenshots/login.png', fullPage: true});

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

test('Login hard coded credentials (Con page objects)', async ({page}) => {
 await page.goto("https://www.saucedemo.com/");

  const login = new loginPage(page);
  await login.fillUsername('standard_user');
  await login.fillPassword('secret_sauce');
  await login.clickOnLogin();

});


test('Test loginWithCredentials (Con page objects)', async ({page}) => {
 await page.goto("https://www.saucedemo.com/");

const login = new loginPage(page);
await login.loginWithCredentials("standard_user", "secret_sauce");
await login.checkSuccessFullLogin();

});


test('Test Navigate', async ({page}) => {
 await page.goto(process.env.URL!);
 await page.pause();

  /*
  await page.getByRole('textbox', {name: "Username"}).fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.locator("//input[@type='submit']").click();
  */

});
