const {test, expect} = require('@playwright/test');

test.only('Ticketbox QA Office Load', async ({browser})=>
{
    //chrome plugins
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://qa-office.ticketbox.lk/login");

    const email = page.locator('#email');
    const password = page.locator("[placeholder='Enter your password']");
    const signin = page.locator("[type='submit']");
    const welcome = page.locator("[aria-live='off']");
    const events = page.locator("//span[text()='Events']");
    const description = page.locator("//p[text()='Manage your events and track performance']");
    
    //get title - assertion
   console.log (await page.title());
   await expect(page).toHaveTitle("TicketBox Organizer Panel");

   //Happy Path - Success Login
   await email.fill('ticketboxlk123@gmail.com');
   await password.fill('Pass123$');
   await signin.click();
   await expect (page).toHaveURL('https://qa-office\.ticketbox\.lk/login');
   console.log(await welcome.textContent());
   await expect(welcome).toContainText('Login Successful');



});

