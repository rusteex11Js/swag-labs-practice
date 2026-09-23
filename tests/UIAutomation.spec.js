//importing test
import { expect, test } from "@playwright/test";

test("First step", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.saucedemo.com/");
});

test("second test case step", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.locator("#user-name").fill("performance_glitch_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click({ force: true });

  // console.log(await page.locator('[data-test="error"]').textContent());
  // await expect(page.locator('[data-test="error"]')).toHaveText(" Password is required");
  // expect(page.locator('[data-test="error"]')).toContainText('Password is required');

  // await page.waitForLoadState('domcontentloaded');

  //List
  const msglist = await page
    .locator(".inventory_item_name ")
    .first()
    .textContent();
  console.log(msglist);

  const msglist1 = await page
    .locator(".inventory_item_name ")
    .nth(0)
    .textContent();
  console.log(msglist1);

  const msglist2 = await page
    .locator(".inventory_item_name ")
    .last()
    .textContent();
  console.log(msglist2);

  const textlist = await page
    .locator(".inventory_item_name ")
    .allTextContents();
  console.log(textlist);
});

test("third test case step", async ({ page }) => {
  await page.goto("https://playwrightlab.github.io/");

  await page.locator("#fullName").fill("Vionth");
  const value = await page.locator("#fullName").inputValue();
  console.log(value);
  await expect(await page.locator("#fullName")).toHaveValue("Vionth");
  await page.pause();
  await page.locator("#email").fill("test@gmail.com");
  await page.locator("#password").fill("test@123");
  await page.locator("#dob").fill("1993-02-22");

  //DROPDOWM
  // Select by value
  await page.locator("#country").selectOption("us");

  // Select by visible text
  await page.locator("#country").selectOption({ label: "United Kingdom" });

  // Select by index
  await page.locator("#country").selectOption({ index: 2 });

  await page.locator("#country").selectOption("Canada");
  //Assertion
  await expect(page.locator("#country")).toHaveValue("ca");
  // await expect(page.locator("#country")).toHaveValues(["Canada"]);

  //RADIO:
  await page.locator("#radioMale").click();
  //Assertion
  await expect(page.locator("#radioMale")).toBeChecked();

  //CHECKBOX
  await page.locator("#checkJs").check();
  //Assertion
  await expect(page.locator("#checkJs")).toBeChecked();

  //UNCHECKBOX
  await page.locator("#checkJs").uncheck();
  //Assertion
  await expect(page.locator("#checkJs")).not.toBeChecked();

  //multiple options:
  await page.locator("#multiselectGroup").scrollIntoViewIfNeeded();
  await page
    .locator("#multiSelect")
    .selectOption([{ label: "React" }, { label: "Angular" }]);
  await expect(page.locator("#multiSelect")).toHaveValues(["react", "angular"]);
  await page.pause();
  // console.log(await page.locator('[data-test="error"]').textContent());
  // await expect(page.locator('[data-test="error"]')).toHaveText(" Password is required");
  // expect(page.locator('[data-test="error"]')).toContainText('Password is required');

  // await page.waitForLoadState('domcontentloaded');

  // const msglist = await page.locator('.inventory_item_name ').first().textContent();
  // console.log(msglist);
});

test("fourth test case step", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwrightlab.github.io/");

  await page.locator("#newTabBtn").scrollIntoViewIfNeeded();
  await page.locator("#newTabBtn").waitFor();

  //window handles:
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("#newTabBtn").click(),
  ]);

  const title = await newPage.title();
  console.log(title);

  //screenshot:
  await newPage.screenshot({
    path: "C:\\Users\\Vinot\\Desktop\\Playwright Batch Notes\\playwright-session\\screenshot\\img.png",
  });
  await newPage.close();
  await page.pause();
});

test("fifth test case step", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwrightlab.github.io/");

  await page.locator("#iframeCardHeader").scrollIntoViewIfNeeded();

  //Frames:
  /*const allframe = await page.frames();
console.log(`No of frames ${allframe.length}`);
*/

  //Approachig using element
  /*const frame = await page.frameLocator("#practiceFrame");
const title =  await frame.locator("#iframeTitle").textContent();
console.log(title);
*/

  //Approaching using url:
  /*const frame = await page.frame({url: "https://playwrightlab.github.io/iframe-content.html"});
const title =  await frame.locator("#iframeTitle").textContent();
console.log(title);
*/

  //Approaching using name:
  //Get frame using the frame's name attribute
  /*const frame = await page.frame('name');
const title =  await frame.locator("#iframeTitle").textContent();
console.log(title);
*/

  await page.pause();
});

test.only("sixth test case step", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwrightlab.github.io/");

  await page.locator("#nativeAlert").scrollIntoViewIfNeeded();

  //Enabling Dialog window handler
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("This is a native alert dialog!");
    console.log(dialog.message());
    await dialog.accept();
  });
  await page.locator("#nativeAlert").click();
});

test.only("7th test case step", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwrightlab.github.io/");

  await page.locator("#nativePrompt").scrollIntoViewIfNeeded();

  //Enabling Dialog window handler
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("prompt");
    // expect(dialog.message()).toContain('This is a native alert dialog!');
    expect(dialog.defaultValue()).toContain("Playwright Tester");
    console.log(dialog.defaultValue());
    console.log(dialog.message());
    await dialog.accept("vinoth");
  });
  await page.locator("#nativePrompt").click();
});

test.skip("web table test case", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwrightlab.github.io/");

  await page.locator("#tableControls").scrollIntoViewIfNeeded();

  const table = await page.locator("#tableWrapper").locator("table");

  const header = await table.locator("thead").locator("th");
  console.log(header);

  const row = await table.locator("tbody").locator("tr");
  console.log(await row.count());

  const column = row.nth(0).locator("td");
  console.log(await column.count());

  const cellValue = await column.nth(2).textContent();
  console.log(cellValue);
});

test.skip("web updated table test case", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwrightlab.github.io/");

  await page.locator("#tableControls").scrollIntoViewIfNeeded();

  const table = await page.locator("#tableWrapper").locator("table");
  const header = await table.locator("thead").locator("th");

  for (let i = 0; i < await header.count(); i++) {
    const headerTitle = await header.nth(i).textContent();
    if (headerTitle.includes("Name") || headerTitle.includes("Email") ) {
      const row = await table.locator("tbody").locator("tr");
      let rowCount = await row.count();
      console.log("row cout => ",rowCount);
      for (let j = 0; j < rowCount; j++) {
        const column = row.nth(j).locator("td");
        const cellValue = await column.nth(i).textContent();
        console.log(cellValue);
      }
    }
  }

  const headers = (await page.locator('#tableWrapper table thead tr').first().locator('th').allTextContents())
  .map(h => h.trim());
  console.log(headers);

  const names = await page.locator('#tableWrapper table tbody tr').nth(2).locator('td').nth(2).textContent();
  console.log(names);

});

test.skip("mouse hover", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwrightlab.github.io/");
  await page.locator("#tooltipBtn").scrollIntoViewIfNeeded();

  //hover
  const mouseHover = await page.locator("#tooltipBtn");
  await mouseHover.hover();
  const toolTipMessage = await page.locator("#customTooltip");
  const label = await toolTipMessage.textContent();
  console.log(label);

  //double click 
  const dlb = await page.locator("#doubleClickBtn");
  await dlb.dblclick();

  //right click 
  const rightClk = await page.locator("#rightClickBtn");
  await rightClk.click({
  button: 'right',
  delay: 3000
});

//Drag and drop
const source = await page.locator("[data-testid='dnd-item-1']");
const target = await page.locator("#dropZone");
await source.dragTo(target);

await page.pause();


});

test.skip("auto generated text field or suggestion", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://demoqa.com/automation-practice-form");

  const autoSuggestion = await page.locator("#react-select-3-input");
  await autoSuggestion.scrollIntoViewIfNeeded();

  //type one by one
  await autoSuggestion.type('Ha', { delay: 1000 });
  //keyboard operation
  await page.keyboard.press('ArrowDown',{delay : 1000});
  await page.keyboard.press('Enter')
});

test.skip("upload file", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwrightlab.github.io/");

  const fileSectionHeader = await page.locator("[data-testid='upload-card']");
  await fileSectionHeader.scrollIntoViewIfNeeded();

  const uploadFile = await page.locator("[data-testid='upload-card'] input");

  const filePath = "C:/Users/Vinot/Desktop/Playwright Batch Notes/playwright-session/screenshot/img.png"

  //Upload file:
  //------------
  // setInputFiles used to upload the file to application
  await uploadFile.setInputFiles(filePath);

});

test. skip("download file", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwrightlab.github.io/");

  const dwnload = await page.locator("[data-testid='download-link']");
  await dwnload.scrollIntoViewIfNeeded();

  // ---------- DOWNLOAD ----------
  // Wait for the download event while clicking the download link/button.
  const downloadPromise = page.waitForEvent('download');
  await dwnload.click();
  const download = await downloadPromise;

  // Save the downloaded file
  await download.saveAs("C:\\Users\\Vinot\\Desktop\\Playwright Batch Notes\\playwright-session\\download\\" +download.suggestedFilename());

  console.log("Downloaded: "+download.suggestedFilename());

});


test("playwright wait concepts file", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwrightlab.github.io/");

  const dwnload = await page.locator("#loadDelayedBtn");
  await dwnload.scrollIntoViewIfNeeded();
  await dwnload.click();

 //wait for 5sec
  await page.waitForTimeout(5000);

  //content
  const contentMsg = await page.locator(".loaded-data").textContent();
  console.log("Message => ",contentMsg);

});

test("playwright wait concepts Page loads", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.saucedemo.com/");
  
  const userName = await page.locator("#user-name");
  await userName.fill("performance_glitch_user");

  const password  = await page.locator("#password");
  await password.fill("secret_sauce");

  const login_btn  = await page.locator("#login-button");
  await login_btn.click();

  const headerTitle = await page.locator(".app_logo");
  const str = await headerTitle.textContent();
  console.log(str);
  //await page.waitForLoadState("domcontentloaded");

});
