const {test, expect} = require('@playwright/test');

test('Ticketbox QA Load', async ({page})=>
{
    await page.goto("https://qa.ticketbox.lk");

    //get title - assertion
   console.log (await page.title());
   await expect(page).toHaveTitle("TicketBox - Sri Lanka's Premium Event Tickets Platform");

   await page.locator('#email').fill('ticketboxlk123@gmail.com');
   await page.locator("[placeholder='Enter your password']").fill('Pass123$');
   await page.locator("[type='submit']").click();
});
