import {test, expect} from 'playwright/test';

test('test Web Table', async ({page}) => {
    await page.goto("https://practice.expandtesting.com/tables");

    const tableContainer = await page.locator("xpath=.//div[@class='table-responsive']");

    const rows = await tableContainer.locator("xpath=.//table[@id='table1']//tbody//tr").all();
    console.log("Number of rows: " + rows.length);

    const lastNames: Users[] = [];

    
    for(let row of rows){
        let user: Users = {
            lastName: await row.locator("td").nth(0).innerText(),
            firstName: await row.locator("td").nth(1).innerText(),
            email: await row.locator("td").nth(2).innerText(),
            due: parseFloat(await row.locator("td").nth(3).innerText()) || 0,
            webSite: await row.locator("td").nth(4).innerText(),
            action: await row.locator("td").nth(5).innerText()
        }
        lastNames.push(user);
    }
    
        for(let userCaptured of lastNames){
            console.log(userCaptured)
        }

        const whereDueGreaterThan50 = lastNames.filter(user => user.due > 50);
        console.log("Users with due greater than 50: ", whereDueGreaterThan50);


    /*
       const row1 = rows[1];
       const constLastName = await row1.locator("//td[1]").innerText();
       const constFirstName = await row1.locator("//td[2]").innerText();
       const constEmail = await row1.locator("//td[3]").innerText();
       const constDue = await row1.locator("//td[4]").innerText();
       const constWebSite = await row1.locator("//td[5]").innerText();
       const constAction = await row1.locator("//td[6]").innerText();

       console.log(constLastName, constFirstName, constEmail, constDue, constWebSite, constAction);
       */

})

interface Users{
    lastName: string;
    firstName: string;
    email: string;
    due: number;
    webSite: string;
    action: string;
}

/*
element container: //div[@class='table-responsive']
.tr => fila
.td => columna

//div[@class='table-responsive']//table[@id='table1']//tr[1]//td[1] => Last Name
//div[@class='table-responsive']//table[@id='table1']//tr[1]//td[2] => First Name
//div[@class='table-responsive']//table[@id='table1']//tr[1]//td[3] => Email
//div[@class='table-responsive']//table[@id='table1']//tr[1]//td[4] => Due
//div[@class='table-responsive']//table[@id='table1']//tr[1]//td[5] => Web Site
//div[@class='table-responsive']//table[@id='table1']//tr[1]//td[6] => Action

*/