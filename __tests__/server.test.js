// __tests__/server.test.js
const request = require("supertest");
const app = require("../server.cjs"); // Import your server instance

describe("NotionMail API", () => {
  let messageId; // To store the ID of the message we create

  it("should store a new message", async () => {
    const response = await request(app)
      .post("/add-message")
      .send({
        sender: "ivan",
        recipient: "simon",
        message: "Hello world!",
        timestamp: new Date().toISOString(),
      });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Message stored successfully!");

    // Store the ID of the created message for later tests
    messageId = response.body.data.id; // Adjust this according to your response structure
  });

  it("should read messages for a recipient", async () => {
    const response = await request(app)
      .post("/read-messages")
      .send({
        recipient: "simon",
      });
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.messages)).toBe(true);
  });

  it("should return no messages for a non-existent recipient", async () => {
    const response = await request(app)
      .post("/read-messages")
      .send({
        recipient: "nonexistent_user",
      });

    expect(response.status).toBe(200);
    expect(response.body.messages.length).toBe(0);
  });

  it("should delete a message", async () => {
    const response = await request(app)
      .delete(`/delete-message/${messageId}`); // Use the stored message ID

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Message deleted successfully!");

    // Verify the message has been deleted
    const readResponse = await request(app)
      .post("/read-messages")
      .send({ recipient: "simon" });

    const messages = readResponse.body.messages;
    expect(messages).not.toContainEqual(expect.objectContaining({ id: messageId }));
  });
});