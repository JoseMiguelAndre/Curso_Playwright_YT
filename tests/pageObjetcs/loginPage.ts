import { Locator, Page, expect } from "@playwright/test";

export class loginPage {

private readonly usernameTextbox: Locator;
private readonly passwordTextbox: Locator;
private readonly loginButton: Locator;
private readonly shoppingCartIcon: Locator;

//Únicamente localizadores
constructor(page: Page){
    this.usernameTextbox = page.getByRole('textbox', {name: "Username"});
    this.passwordTextbox = page.getByRole('textbox', {name: "Password"});
    this.loginButton = page.getByRole('button', {name: "Login"});
    this.shoppingCartIcon = page.locator("//a[@data-test='shopping-cart-link']");
}   

//Funciones que interactuan con los localizadores y que llamas desde el test
async fillUsername(username: string){
    await this.usernameTextbox.fill(username);
}

async fillPassword(password: string){
    await this.passwordTextbox.fill(password);
}

async clickOnLogin(){
    await this.loginButton.click();
}

async checkSuccessFullLogin(){
    await expect(this.shoppingCartIcon).toBeVisible();
}


async loginWithCredentials(username: string, password: string){
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickOnLogin();
}

}