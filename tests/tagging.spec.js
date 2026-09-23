import { test } from "@playwright/test";

test("test case 1", { tag: "@smoke" }, async () => {
  console.log("test case 1");
});

test("test case 2", { tag: "@smoke" }, async () => {
  console.log("test case 2");
});

test("test case 3", { tag: "@sanity" }, async () => {
  console.log("test case 3");
});

test("test case 4", { tag: ["@reg","@smoke","@sanity"] }, async () => {
  console.log("test case 4");
});

test("test case 5", { tag: "@sanity" }, async () => {
  console.log("test case 5");
});

test("test case 6", { tag: "@smoke" }, async () => {
  console.log("test case 6");
});
