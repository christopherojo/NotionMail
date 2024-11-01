import inquirer from "inquirer";
import axios from "axios";


// Main function (update to include delete option)
async function start() {
	const answer = await inquirer.prompt([
		{
      type: 'list',
      name: 'action',
      message: 'Please select an option:',
      choices: ['send', 'read', 'delete', 'exit'] // Added delete option
    }
  ]);
	
  if (answer.action === 'send') {
		await sendMail();
  } else if (answer.action === 'read') {
		await readMail();
  } else if (answer.action === 'delete') {
		await deleteMail(); // Call delete function
  } else if (answer.action === 'exit') {
		console.log('Goodbye!');
    process.exit(); // Exit the CLI
  }
	
  start(); // Loop back to the main menu
}

// Send mail function
async function sendMail() {
	const { sender, recipient, message } = await inquirer.prompt([
		{ type: 'input', name: 'sender', message: 'Sender:' },
    { type: 'input', name: 'recipient', message: 'Recipient:' },
    { type: 'input', name: 'message', message: 'Message:' }
  ]);
	
  // Add a timestamp
  const timestamp = new Date().toISOString();
	
  try {
		await axios.post('http://localhost:3000/add-message', { sender, recipient, message, timestamp });
    console.log('Message sent!');
  } catch (error) {
		console.error('Error sending message:', error);
  }
}

// Read mail function
async function readMail() {
	const { recipient } = await inquirer.prompt([
		{ type: 'input', name: 'recipient', message: 'User:' }
  ]);
	
  try {
		const response = await axios.post('http://localhost:3000/read-messages', { recipient });
    const messages = response.data.messages;
		
    if (messages.length === 0) {
			console.log('No messages found for this user.');
    } else {
			console.log(`Messages (${messages.length}):`);
      messages.forEach((msg, index) => {
				console.log(`\nMessage (${index + 1}):`);
        console.log(`from: ${msg.sender}`);
        console.log(`Message: ${msg.message}`);
        console.log(`Sent at: ${msg.cleanTimestamp}`);
      });
    }
  } catch (error) {
		console.error('Error reading messages:', error);
  }
}

// Delete mail function (update)
async function deleteMail() {
	const { recipient } = await inquirer.prompt([
		{ type: 'input', name: 'recipient', message: 'Enter the recipient of the messages to delete:' }
	]);
	
	const messages = await fetchMessages(recipient); // Fetch messages for the given recipient
	
	if (messages.length === 0) {
		console.log('No messages found for this user.');
		return; // Exit if no messages
	}
	
	// Display the messages and allow user to select which to delete
	const messageChoices = messages.map((msg, index) => ({
		name: `From: ${msg.sender}, Message: "${msg.message}", Sent at: ${msg.cleanTimestamp}`,
		value: msg.id // Use the message ID as the value for deletion
	}));
	
	const { selectedMessages } = await inquirer.prompt([
		{
			type: 'checkbox',
			name: 'selectedMessages',
			message: 'Select messages to delete:',
			choices: messageChoices
		}
	]);
	
	// Delete selected messages
	for (const id of selectedMessages) {
		try {
			const response = await axios.delete(`http://localhost:3000/delete-message/${id}`);
			console.log(response.data.message);
		} catch (error) {
			console.error('Error deleting message:', error.response ? error.response.data : error);
		}
	}
}

// Fetch messages for a recipient
async function fetchMessages(recipient) {
	try {
		const response = await axios.post('http://localhost:3000/read-messages', { recipient });
		return response.data.messages; // Return the list of messages
	} catch (error) {
		console.error('Error fetching messages:', error.response ? error.response.data : error);
		return [];
	}
}

start();