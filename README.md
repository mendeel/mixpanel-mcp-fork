# Mixpanel MCP
[![smithery badge](https://smithery.ai/badge/@dragonkhoi/mixpanel-mcp)](https://smithery.ai/server/@dragonkhoi/mixpanel-mcp)

Simple MCP server that interfaces with the Mixpanel API, allowing you to talk to your Mixpanel events data from any MCP client like Cursor or Claude Desktop. Query events data, retention, and funnels.

## Installation
Make sure to go to your Mixpanel Organization Settings to set up a [Mixpanel Service Account](https://developer.mixpanel.com/reference/service-accounts), get the username, password, and your project ID (in Mixpanel Project Settings).

Pass these as your arguments in the command: `<USERNAME> <PW> <PROJECT_ID>`

### Remote 1-line command
Coming soon

### Clone and run locally
Clone this repo
Run `npm run build`
Paste this command into Cursor (or whatever MCP Client)
`node /ABSOLUTE/PATH/TO/mixpanel-mcp/build/index.js YOUR_SERVICE_ACCOUNT_USERNAME YOUR_SERVICE_ACCOUNT_PASSWORD YOUR_PROJECT_ID`

## Examples
- Ask about retention numbers

<img width="500" alt="IMG_3675" src="https://github.com/user-attachments/assets/5999958e-d4f6-4824-b226-50ad416ab064" />


- Ask for an overview of events

<img width="500" alt="IMG_9968" src="https://github.com/user-attachments/assets/c05cd932-5ca8-4a5b-a31c-7da2c4f2fa77" />
