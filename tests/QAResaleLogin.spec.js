const {test, expect} = require('@playwright/test');

test('Ticketbox QA Resale  Load', async ({page})=>
{
    await page.goto("https://qa-resale.ticketbox.lk");

    //get title - assertion
   console.log (await page.title());
   await expect(page).toHaveTitle("TicketBox Reselling - Sri Lanka's First and Premium Event Tickets Reselling Platform");

   await page.locator('#email').fill('ticketboxlk123@gmail.com');
   await page.locator("[placeholder='Enter your password']").fill('Pass123$');
   await page.locator("[type='submit']").click();
});
