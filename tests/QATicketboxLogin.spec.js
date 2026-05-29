const {test, expect} = require('@playwright/test');

test('Ticketbox QA Load', async ({page})=>
{
    await page.goto("https://qa.ticketbox.lk");

    const email = page.locator('#email');
    const password = page.locator("[placeholder='Enter your password']");
    const submit = page.locator("[type='submit']");

    //get title - assertion
   console.log (await page.title());
   await expect(page).toHaveTitle("TicketBox - Sri Lanka's Premium Event Tickets Platform");

   await email.fill('ticketboxlk123@gmail.com');
   await password.fill('Pass123$');
   await submit.click();
});
