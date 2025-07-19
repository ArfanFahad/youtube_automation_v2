import { checkAndNotify } from "./checkAndNotify.js";

const WAIT_TIME = 60 * 1000;

const startStreamMonitor = async () => {
  await checkAndNotify();
  setInterval(checkAndNotify, WAIT_TIME);
};

export { startStreamMonitor };
