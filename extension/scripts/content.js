function main() {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log("request received", request);
    if (request && request.action === "getText") {
      const bodyText = document.getElementsByTagName("body")[0].textContent;
      console.log(bodyText);
      sendResponse({ body: bodyText });
    }
    if (request && request.action === "sendText") {
      console.log(request.text);
      document.getElementsByTagName(
        "html"
      )[0].innerHTML = `<html style="padding: 24px;">${request.text}`;
    }
  });
}

(function () {
  console.log("Good Stuff content script started");
  setTimeout(main, 1000);
})();

chrome.runtime.onConnect.addListener((port) => {
  console.log("connected ", port);

  main();
  // if (port.name === 'hi') {
  //   port.onMessage.addListener(this.processMessage);
  // }
});
