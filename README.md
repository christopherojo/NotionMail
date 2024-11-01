# NotionMail: A Notion-Based Messaging CLI

<img src="https://dev.notion.so/front-static/external/readme/images/notion-email-example@2x.png" alt="NotionMail logo" width="500"/>

## About NotionMail

NotionMail is a command-line interface (CLI) application that enables users to send, read, and delete messages using a Notion database as a backend. This integration leverages the Notion API to manage messages as database entries, making it easy to keep track of communications directly within your Notion workspace.

### Key Features

- Send Messages - *Easily send messages to users within your Notion workspace.*
- Read Messages - *Retrieve and view messages sent to specific users.*
- Delete Messages - *Selectively delete messages through an interactive prompt.*
- Testing Suite - *Ensures program correctness and reliability.*

### Improvements Implemented

1. **Testing Suite:** A testing suite was implemented to automate program verification, ensuring reliability and reducing the risk of bugs during updates.

2. **Message Deletion Feature:** Users can now delete specific messages through an interactive prompt, making it easier to manage their message history and keep the workspace organized.

3. **Timestamps for Messages:** Each message now includes a timestamp, allowing users to track communication timelines and prioritize their responses effectively.

## Installation and Running

### 1. Setup your local project

```bash
# Clone this repository locally
git clone https://github.com/christopherojo/notionmail.git
```

#### Switch into the project directory

```bash
cd notionmail
```

#### Install the dependencies

```bash
npm install
```

### 2. Set Up Your Notion Workspace

To start using NotionMail, you'll need to create a Notion API key. Follow these steps:

1. Go to [Notion's integrations page](https://www.notion.com/my-integrations).
2. Create a new integration and copy the integration token.

### 3. Create a Notion Database

To manage your messages, you'll need a Notion database. You can create one by duplicating [this example database template](https://public-api-examples.notion.site/f3e098475baa45878759ed8d04ea79af).

Ensure your Notion integration has access to this database by sharing it with the integration. Follow the instructions found in Notion's [Integration guide](https://developers.notion.com/docs/create-a-notion-integration#step-2-share-a-database-with-your-integration).

### 4. Set Your Environment Variables

Create a `.env` file in your project directory and add the following fields:

```plaintext
NOTION_KEY=<your-notion-api-key>
NOTION_DATABASE_ID=<your-notion-database-id>
PORT=<desired-port-number>
```

### 5. Run the Program

Before running the NotionMail CLI, it's a good practice to run the tests to ensure everything is working correctly. Use the following command:

```bash
npm test
```

Once the tests pass, you can start the server by running:

```bash
node server.cjs
```

With the server running, you can start the NotionMail CLI by executing:

```bash
npm run start
```

Follow the prompts in the CLI to send, read, or delete messages.

## References

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/en/starter/installing.html)
- [Notion API Documentation](https://developers.notion.com/docs)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Supertest Documentation](https://www.npmjs.com/package/supertest)
- [Inquirer.js Documentation](https://github.com/SBoudrias/Inquirer.js#readme)
- [Stack Overflow: Node.js CLI applications](https://stackoverflow.com/questions/tagged/node.js+cli)
- [ChatGPT](https://openai.com/chatgpt) - Used for explanations of concepts and comments on code.

## Future Improvements

- Message Notifications: Implement a notification system to alert users when new messages arrive.
- Message Search Functionality: Add the ability to search for messages based on keywords or other criteria.
- User Authentication: Incorporate user authentication to manage multiple users and their respective messages securely.

## Technical Choices

- Selected widely-used technologies such as Jest, Node.js, JavaScript, Express.js, Axios, and Supertest.
- Opted for Express.js to build the API because of its straightforwardness and flexibility.
- Utilized Axios for making HTTP requests to the Notion API, benefiting from its user-friendly promise-based interface.
- Implemented a modular architecture to enhance code organization and maintainability.
- Incorporated Inquirer.js to enable live interaction with the CLI, allowing users to navigate and select options more intuitively instead of just using numbers.

## Acknowledgments

Developed by Christopher Ojo.