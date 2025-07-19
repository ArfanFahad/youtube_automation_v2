import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import qrcode from "qrcode-terminal";

let whatsappClient;

const createWhatsAppClient = () => {
  return new Promise((resolve, reject) => {
    const client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    });

    client.on("qr", (qr) => {
      console.log("Scan this QR code to log in: ");
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("WhatsApp is ready.");
      whatsappClient = client;
      resolve(client);
    });

    client.on("auth_failure", (msg) => {
      console.error("Auth Failure: ", msg);
      reject(new Error("Auth failure"));
    });

    client.on("disconnected", (reason) => {
      console.warn("WhatsApp disconnected: ", reason);
    });

    client.initialize();
  });
};

const sendMessageToGroup = async (groupName, message) => {
  if (!whatsappClient) {
    throw new Error("WhatsApp client not initialized.");
  }

  const chats = await whatsappClient.getChats();

  const group = chats.find((chat) => {
    return chat.isGroup && chat.name === groupName;
  });

  if (group) {
    console.log("Group Name: ", group.name);
    console.log("Group ID: ", group.id._serialized);
    console.log(`Sending message to : ${group.name}`);
    await whatsappClient.sendMessage(group.id._serialized, message);
    console.log(`Message sent to group "${groupName}"`);
  } else {
    console.log(`Group "${groupName} not found."`);
  }
};

export { createWhatsAppClient, sendMessageToGroup };
