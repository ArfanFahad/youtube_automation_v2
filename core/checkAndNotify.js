import { checkLiveStatus } from "../services/youtubeLive.js";
import { getState, setStatus } from "../live_state/stateManager.js";
import { sendWhatsAppUpdate } from "../lib/sendWhatsAppUpdate.js";
import config from "../config/config.js";
import { handleFirstCheck } from "../utils/handleFirstCheck.js";
import { handleStatusTransition } from "../utils/handleStatusTransition.js";
import { handleError } from "../utils/handleError.js";

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
        await sendWhatsAppUpdate(groupName, message);
      }
    } else {
      const message = handleStatusTransition(previous, newStatus);
      console.log("Handle Status Transition Print:", message);
      if (message) {
        console.log("Inside Condition, WhatsApp client is trying to start...");
        await sendWhatsAppUpdate(groupName, message);
        console.log("Condition rendered. Message sent to whatsapp");
      }
    }

    setStatus(newStatus);
  } catch (err) {
    console.error("Unexpected error in monitor loop: ", err);
  }
};

export { checkAndNotify };
