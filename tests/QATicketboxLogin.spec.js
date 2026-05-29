const {test, expect} = require('@playwright/test');

test.only('Ticketbox QA Load)', async ({browser})=>
{
    //chrome plugins
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://qa.ticketbox.lk/");

    const accept = page.locator("//button[normalize-space()='Accept All']");

    const person = page.locator('button:has(svg.lucide-user)').first();
    const label = page.locator("//h3[contains(text(),'Welcome Back')]");
    const email = page.locator('#email');
    const password = page.locator('#password'); 
    const submit = page.locator("[type='submit']");
    const errormsg = page.locator("[aria-live='polite']");
    const signin = page.locator("//a[text()='Sign in']");
    
    const signup = page.locator("[href='/signup']");
    const signuptitle = page.locator("//h3[text()='Join TicketBox']");
    const firstname = page.locator('#firstName');
    const lastname = page.locator('#lastName');
    const phone = page.locator('#phone');
    const confirmpw = page.locator('#confirmPassword');
    const terms = page.locator('#agreeToTerms');
    const alreadyexist = page.locator("//div[text()='Email already registered']");

    //get title - assertion
   console.log (await page.title());
   await expect(page).toHaveTitle("TicketBox - Sri Lanka's Premium Event Tickets Platform");

   //Cookie Acceptance
   await accept.click();
   await person.click();
   console.log (await label.textContent());
   await expect(label).toContainText("Welcome Back");


   /* sign up for new user - happy path handled manuallay as otp request is involved.
   sign up with already existing email - negative scenario */
   await signup.click();
   await expect (page).toHaveURL('https://qa\.ticketbox\.lk/signup');
   console.log (await signuptitle.textContent());
   await expect(signuptitle).toContainText('Join TicketBox');
   await firstname.fill('Bhagya');
   await lastname.fill('Weerasinghe');
   await phone.fill('0716204974');
   await email.fill('bhagyaexternal@gmail.com');
   await password.fill('Pass123#');
   await confirmpw.fill('Pass123#');
   await terms.click();
   await submit.click();
   console.log (await alreadyexist.textContent());
   await expect(alreadyexist).toContainText('Email already registered');

   //sign in with non-existing user - negative scenario
   await signin.click();
   await expect (page).toHaveURL('https://qa\.ticketbox\.lk/login');
   await email.fill('test@gmail.com');
   await password.fill('test123');
   await submit.click();
   console.log (await errormsg.textContent());
   await expect(errormsg).toContainText('Invalid credentials');

   //sign in with existing user - happy path
   await email.fill("");
   await password.fill("");
   await email.fill('bhagyaexternal@gmail.com');
   await password.fill('Pass123#');
   await submit.click();
   console.log (await page.title());
   await expect(page).toHaveTitle("TicketBox - Sri Lanka's Premium Event Tickets Platform");
});

