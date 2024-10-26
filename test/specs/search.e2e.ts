import { expect, $, browser } from "@wdio/globals";

describe("Search Component E2E Tests", () => {
  before(async () => {
    await browser.url("http://localhost:5173/");
  });
  it("should update input value and trigger search on button click", async () => {
    const searchInput = await $('input[type="text"]');
    const searchButton = await $('button[type="submit"]');
    await searchInput.setValue("test search term");
    expect(await searchInput.getValue()).toBe("test search term");
    await searchButton.click();
  });
});
