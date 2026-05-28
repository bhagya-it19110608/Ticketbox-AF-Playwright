const {test, expect} = require('@playwright/test');

test.only('Ticketbox QA Resale page load)', async ({browser})=>
{
    //chrome plugins
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://qa-resale.ticketbox.lk/");

    const accept = page.locator("//button[normalize-space()='Accept All']");
    const person = page.locator('button:has(svg.lucide-user)').first();
    const label = page.locator("//h3[contains(text(),'Welcome Back')]");

    //get title - assertion
   console.log (await page.title());
   await expect(page).toHaveTitle("TicketBox Reselling - Sri Lanka's First and Premium Event Tickets Reselling Platform");

   //Cookie Acceptance
   await accept.click();
   await person.click();
   console.log (await label.textContent());
   await expect(label).toContainText("Welcome Back");

});

