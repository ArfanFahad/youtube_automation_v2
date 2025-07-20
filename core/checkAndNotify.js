import { checkLiveStatus } from "../services/youtubeLive.js";
import { getState, setStatus } from "../live_state/stateManager.js";
import { createWhatsAppClient, sendMessageToGroup } from "../lib/whatsapp.js";
import config from "../config/config.js";
import { handleFirstCheck } from "../utils/handleFirstCheck.js";
import { handleStatusTransition } from "../utils/handleStatusTransition.js";
import { handleError } from "../utils/handleError.js";
import ora from "ora";

const sendWhatsAppUpdate = async (groupName, message, spinnerMessge) => {
  const spinner = ora(spinnerMessge).start();
  try {
    await createWhatsAppClient();
    await sendMessageToGroup(groupName, message);
    spinner.succeed(" Message sent successfully.");
  } catch (error) {
    spinner.fail(" Failed to send message on WhatsApp.");
    console.error("Error during WhatsApp message send: ", error.message);
  }
};

const checkAndNotify = async () => {
  try {
    const current = await checkLiveStatus();
    const previous = getState(); // null, first time
    const groupName = config.whatsappGroupName;

    console.log(`[Check] Current: ${current.status}, Previous: ${previous}`);

    if (current.status === "ERROR") {
      await handleError(current.reason, groupName);
      return;
    }

    const newStatus = current.status;

    if (previous === null) {
      const message = handleFirstCheck(newStatus);
      if (message) {
        await sendWhatsAppUpdate(
          groupName,
          message,
          "First time check: creating WhatsApp instance...\n"
        );
      }
    } else {
      const message = handleStatusTransition(previous, newStatus);
      if (message) {
        await sendWhatsAppUpdate(
          groupName,
          message,
          "Regular check: updating WhatsApp...\n"
        );
      }
    }

    setStatus(newStatus);
  } catch (err) {
    console.error("Unexpected error in monitor loop: ", err);
  }
};

export { checkAndNotify };
