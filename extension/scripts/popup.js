const $ = document.getElementById.bind(document);

function callApi(text, userPrompt) {
  console.log("callApi", userPrompt);
  const systemPrompt =
    "You are an expert in web development, a Senior UX Designer and seasoned writer. Your job is to simplify web sites so they show the useful parts as needed by the user and described in their prompts. Eliminate ads and text that is irrelevant. Write complete code with all the content. Do not write code comments. Do not write placeholders. Make no observations. Output raw HTML without Markdown formatting. Create CSS in the style of the NYTimes. ";
  const PAT = "[YOUR_KEY_HERE]";
  const USER_ID = "openai";
  const APP_ID = "chat-completion";
  const MODEL_ID = "gpt-4-turbo";
  const MODEL_VERSION_ID = "[MODEL_VERSION_ID_HERE]";
  const RAW_TEXT = `${systemPrompt}\n\nModify the Page Source below in the following way: ${userPrompt}.\n\n Use the following page source:\n${text}`;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          text: {
            raw: RAW_TEXT,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  // return Promise.resolve(
  //   "```html\n\u003cdiv itemprop=\"text\"\u003e\n\u003cp\u003eYou can join all the innerHTML's and message that.\u003c/p\u003e\n\u003cpre\u003e\u003ccode\u003echrome.tabs.query({\n    active: true,\n    lastFocusedWindow: true\n  },\n  function(array_of_Tabs) {\n    chrome.tabs.executeScript(tab.id, {\n      code: `chrome.runtime.sendMessage([...document.getElementsByTagName('p')].reduce(function(agg, elem) {agg.push(elem.innerHTML); return agg; }, []).join(\"\\n\u003cbr\u003e\"));`\n    });\n  });\n\nchrome.runtime.onMessage.addListener(function(request) {\n  document.getElementsByTagName('html')[0].innerHTML = request;\n});\u003c/code\u003e\u003c/pre\u003e\n\u003c/div\u003e\n```"
  // );

  return fetch(
    "https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs",
    requestOptions
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      if (data.status.code != 10000) {
        console.log(data.status);
        return `Error: ${data.status.description}`;
      } else {
        console.log(data["outputs"][0]["data"]["text"]["raw"]);
        return data["outputs"][0]["data"]["text"]["raw"];
      }
    })
    .catch((error) => console.log("error", error));
}

function main() {
  var submitBtn = $("dom");
  var prompt = $("prompt");
  var form = $("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const btnText = submitBtn.innerText;
    submitBtn.innerText = "Processing...";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getText" }, (resp) => {
        console.log("response", resp);
        callApi(resp.body, prompt.value).then((text) => {
          submitBtn.innerText = btnText;
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "sendText",
            text: text && text.replace("```html", "").replace("```", ""),
          });
        });
      });
    });
  });
}

(function () {
  console.log("Good Stuff started");
})();

document.addEventListener("DOMContentLoaded", function () {
  main();
});
