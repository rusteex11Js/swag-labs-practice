import {test} from "@playwright/test";

test('config ',async({page})=>{
     await page.goto('https://playwright.dev/');
    
      // Expect a title "to contain" a substring.
    //   await expect(page).toHaveTitle(/Playwright/);
})