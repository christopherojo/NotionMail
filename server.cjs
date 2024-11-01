require("dotenv").config();
const express = require("express");
const app = express();

// Initialize Notion client
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });

// Middleware to parse JSON
app.use(express.json());

// Route to add a new message to the Notion database
app.post("/add-message", async function (req, res) {
	const { sender, recipient, message } = req.body;
	const databaseId = process.env.NOTION_DATABASE_ID;

	try {
		const responseFromNotion = await notion.pages.create({
			parent: { database_id: databaseId },
			properties: {
				Message: {
					title: [
						{
							type: "text",
							text: {
								content: message,
							},
						},
					],
				},
				Sender: {
					rich_text: [
						{
							type: "text",
							text: {
								content: sender,
							},
						},
					],
				},
				Recipient: {
					rich_text: [
						{
							type: "text",
							text: {
								content: recipient,
							},
						},
					],
				},
			},
		});

		res.json({
			message: "Message stored successfully!",
			data: responseFromNotion,
		});
	} catch (error) {
		res.status(500).json({ message: "Error storing message", error });
	}
});

// Read messages from Notion
app.post("/read-messages", async (req, res) => {
	const { recipient } = req.body;
	const databaseId = process.env.NOTION_DATABASE_ID;

	try {
		const responseFromNotion = await notion.databases.query({
			database_id: databaseId,
			filter: {
				property: "Recipient",
				rich_text: {
					contains: recipient,
				},
			},
		});

		const messages = responseFromNotion.results.map((page) => {
			const sender = page.properties.Sender.rich_text[0]?.text.content;
			const message = page.properties.Message.title[0]?.text.content;
			const timestamp = new Date(page.properties.Timestamp.created_time);

			const formattedTimestamp = timestamp.toLocaleString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric",
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			});

			return { id: page.id, sender, message, cleanTimestamp: formattedTimestamp }; // Include timestamp in response
		});

		res.json({ messages });
	} catch (error) {
		res.status(500).json({ message: "Error reading messages", error });
	}
});

// Delete message from Notion
app.delete("/delete-message/:id", async (req, res) => {
	const { id } = req.params;

	try {
		await notion.pages.update({
			page_id: id,
			archived: true, // Archive the page instead of deleting it permanently
		});

		res.json({ message: "Message deleted successfully!" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting message", error });
	}
});

// Export the app for testing
module.exports = app;

// Start the server
if (require.main === module) {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}