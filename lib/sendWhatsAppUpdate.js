import { createWhatsAppClient, sendMessageToGroup } from "./whatsapp.js";

const sendWhatsAppUpdate = async (groupName, message) => {
  try {
    console.log("Creating WhatsApp Client...");
    await createWhatsAppClient();
    console.log("WhatsApp Client Created");

    console.log("Sending message to group: ", groupName, "Message: ", message);
    await sendMessageToGroup(groupName, message);
    console.log("✅ Message sent successfully.");
  } catch (error) {
    console.error("Error during WhatsApp message send: ", error.message);
  }
};

export { sendWhatsAppUpdate };
