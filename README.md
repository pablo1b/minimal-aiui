# Minimal AI UI

Minimal AI UI is a Google Chrome extension that simplifies web pages by removing irrelevant content and ads, based on user prompts. It uses an AI model to determine what parts of the page are relevant.

## Features

- Simplify web pages based on user prompts
- Remove irrelevant content and ads
- Uses AI to determine relevant content

## Installation

1. Clone this repository
2. Open the Extension Management page by navigating to `chrome://extensions`
   - Alternatively, open this page by clicking on the Chrome menu, hovering over **More Tools**, and selecting **Extensions**
3. Enable Developer Mode by clicking the toggle switch next to **Developer mode**
4. Click the **Load unpacked** button and select the extension directory

## Usage

1. Click on the extension icon in the toolbar
2. Enter your prompt in the text field
3. Click the **Simplify** button

## Configuration

To change the API keys, you need to modify the `popup.js` file:

```
javascript
function callApi(text, userPrompt) {
...
const PAT = "[YOUR_KEY_HERE]";
const USER_ID = "openai";
const APP_ID = "chat-completion";
const MODEL_ID = "gpt-4-turbo";
const MODEL_VERSION_ID = "[MODEL_VERSION_ID_HERE]";
...
}
```

Replace `[YOUR_KEY_HERE]` with your API key and `[MODEL_VERSION_ID_HERE]` with your model version ID.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)