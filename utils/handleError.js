import { sendMessageToGroup } from "../lib/whatsapp.js";

let errorCount = 0;

const handleError = async (reason, groupName) => {
  errorCount++;
  console.error("Error checking live status: ", reason);

  if (errorCount >= 3) {
    await sendMessageToGroup(
      groupName,
      `Error checking live status 3 times in a row. Reason: ${reason}`
    );
    errorCount = 0;
  }
};

export { handleError };
