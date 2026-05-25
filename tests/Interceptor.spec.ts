import {test, expect} from '@playwright/test'
import { loginPage } from './pageObjetcs/loginPage';

test('Interceptor bloquear imagenes', async ({page}) => {

  await page.on('request', async (req) => {
    console.log(req.url());     //Llamar a Interceptor para imprimir en consola todas las URLs a las que se hace una petición

    //Buscar el link con dev tools de una imagen por ejemplo
    //https://www.saucedemo.com/static/media/sauce-backpack-1200x1500.0a0b85a385945026062b.jpg
    //https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b09a7d77409d63.jpg

    await page.route(
        "https://www.saucedemo.com/static/media/sauce-backpack-1200x1500.0a0b85a385945026062b.jpg", (route) => route.abort()
    ); //Interceptor para bloquear la carga de una imagen específica

        await page.route(
        "**/*.{png,jpg,jpeg,css}", (route) => route.abort() //Interceptor para bloquear la carga de todas las imágenes, el "**/*.{png,jpg,jpeg}" es un comodín que indica que se deben bloquear todas las URLs que terminen con .png, .jpg o .jpeg
    ); 


    





  })
  await page.goto("https://www.saucedemo.com/");

  const login = new loginPage(page);
  await login.loginWithCredentials("standard_user", "secret_sauce");
  await login.checkSuccessFullLogin();

await page.screenshot({path: 'Screenshots/LoginInterceptor2.png', fullPage: true}); //Tomar screenshot para verificar que las imágenes fueron bloqueadas



  
 });

 test('Interceptor Modificar elementos', async ({page}) => {

  await page.route(
      "https://demoqa.com/BookStore/v1/Books", (route) => {
        route.fulfill({
          status: 200,
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "books": [
                {
                    "isbn": "9781449325862",
                    "title": "El libro que Joss Nunca Escribió",
                    "subTitle": "A Working Introduction",
                    "author": "Richard E. Silverman",
                    "publish_date": "2020-06-04T08:48:39.000Z",
                    "publisher": "O'Reilly Media",
                    "pages": 500,
                    "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                    "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                }
            ]
          })
        });
      }
  );

  await page.goto("https://demoqa.com/books");
  await page.pause();
  await page.screenshot({path: 'Screenshots/BookInterceptor.png', fullPage: true});

});