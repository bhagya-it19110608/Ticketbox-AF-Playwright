const {test, expect} = require('@playwright/test');

test.only('Ticketbox QA Office Load', async ({browser})=>
{
    //chrome plugins
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://qa-office.ticketbox.lk/login");

    const email = page.locator('#email');
    const password = page.locator('#password');
    const signin = page.locator("[type='submit']");
    const welcome = page.locator("[aria-live='off']");
    const dashboard = page.locator("//h2[text()='Dashboard']");
    const description = page.locator("//p[text()='Welcome to your TicketBox organizer panel']");
    
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
   console.log(await dashboard.textContent());
   await expect(dashboard).toContainText('Dashboard');
   console.log(await description.textContent());
   await expect(description).toContainText('Welcome to your TicketBox organizer panel');
});

