const {test, expect} = require('@playwright/test');

test.only('Ticketbox QA Resale page load)', async ({browser})=>
{
    //chrome plugins
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://qa-resale.ticketbox.lk/");
    
    //get title - assertion
   console.log (await page.title());
   await expect(page).toHaveTitle("TicketBox Reselling - Sri Lanka's First and Premium Event Tickets Reselling Platform");
});


