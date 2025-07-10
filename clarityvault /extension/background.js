chrome.runtime.onInstalled.addListener(() => {
  console.log("ClarityVault Extension Installed");
});

chrome.runtime.onStartup.addListener(() => {
  console.log("ClarityVault Extension Active");
});
