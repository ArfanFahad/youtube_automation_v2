import { checkLiveStatus } from "../services/youtubeLive.js";
import { getState, setStatus } from "../live_state/stateManager.js";
import { createWhatsAppClient, sendMessageToGroup } from "../lib/whatsapp.js";
import config from "../config/config.js";
import { handleFirstCheck } from "../utils/handleFirstCheck.js";
import { handleStatusTransition } from "../utils/handleStatusTransition.js";
import { handleError } from "../utils/handleError.js";
import ora from "ora";

const checkAndNotify = async () => {
  try {
    const current = await checkLiveStatus();
    // console.log(current);
    const previous = getState(); // null, first time
    // console.log(previous);
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
        const spinner = ora(
          "Creating WhatsApp Instance, it will take while..."
        ).start();
        await createWhatsAppClient();
        await sendMessageToGroup(groupName, message);
        spinner.succeed("Messege Sent Successfully.");
      }
    } else {
      const message = handleStatusTransition(previous, newStatus);
      if (message) {
        const spinner = ora(
          "Regular Check on WhatsApp, take a while..."
        ).start();
        await createWhatsAppClient();
        await sendMessageToGroup(groupName, message);
        spinner.succeed("Message Sent Successfully.");
      }
    }

    setStatus(newStatus);
  } catch (err) {
    console.error("Unexpected error in monitor loop: ", err);
  }
};

export { checkAndNotify };
