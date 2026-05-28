const {test, expect} = require('@playwright/test');

test('Ticketbox QA Office Load - Login failed (Invalid email)', async ({browser})=>
{
    //chrome plugins
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://qa-office.ticketbox.lk/login");

    const email = page.locator('#email');
    const password = page.locator("[placeholder='Enter your password']");
    const signin = page.locator("[type='submit']");
    const notification = page.locator("[aria-live='assertive']");
    const welcome = page.locator("[aria-live='off']");
    
    //get title - assertion
   console.log (await page.title());
   await expect(page).toHaveTitle("TicketBox Organizer Panel");

   //Negative Scenarios
   await email.fill('ticketbox@gmail.com');
   await password.fill('Pass123$');
   await signin.click();
   console.log (await notification.textContent());
   await expect(notification).toContainText('Invalid credentials');
   
   await email.fill("");

   await email.fill('ticketboxlk123@gmail.com');
   await password.fill('Pass123');
   await signin.click();
   console.log(await notification.textContent());
   await expect(notification).toContainText('Invalid credentials');

   await password.fill("");

   //Happy Path - Success Login
   await email.fill('ticketboxlk123@gmail.com');
   await password.fill('Pass123$');
   await signin.click();
   await expect (page).toHaveURL('https://qa-office\.ticketbox\.lk/');
   console.log(await welcome.textContent());
    await expect(welcome).toContainText('Login Successful');
});



