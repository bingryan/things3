import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(async () => {
  browser.contextMenus.create({
    id: "position_menu",
    title: "thing3",
    type: "normal",
    contexts: ["all"],
  });
});

browser.contextMenus.onClicked.addListener(function (item, tab) {
  if (item.menuItemId === "position_menu") {
    // format selection if it is not null
    const selection = (item.selectionText = item.selectionText
      ? "\n" + item.selectionText[0]
      : "");

    const title = tab?tab!.title!:"";
    const url = tab?.url;

    // https://culturedcode.com/things/support/articles/2803573/
    var thingsURL =
      "things:///add?show-quick-entry=true&title=" +
      encodeURIComponent(title) +
      "&notes=" +
      encodeURIComponent(url + selection);
    browser.tabs.update({ url: thingsURL });
  }
});
