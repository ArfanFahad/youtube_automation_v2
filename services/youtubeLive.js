import config from "../config/config.js";
import { launchBrowser } from "../lib/browser.js";
import { extractVideoInfo } from "../utils/extractVideoInfo.js";
import ora from "ora";

const checkLiveStatus = async () => {
  const url = `https://www.youtube.com/${config.channelHandle}/live`;
  const browser = await launchBrowser();
  const page = await browser.newPage();
  const spinner = ora(
    `Checking Stream Status From: ${config.channelHandle}`
  ).start();

  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
    const videoInfo = await extractVideoInfo(page);
    spinner.succeed("✅ Stream data retrived successfully.");

    if (videoInfo.videoId) {
      return {
        status: "ON",
        title: videoInfo.title,
        video_id: videoInfo.videoId,
      };
    } else {
      return {
        status: "OFF",
        title: "No live stream found.",
      };
    }
  } catch (error) {
    spinner.fail("❌ Failed to check live status.");
    return {
      status: "ERROR",
      error: error.message,
      reason: "Could not load or parse YouTube page.",
    };
  } finally {
    await browser.close();
  }
};

/*
checkLiveStatus().then(console.log);
OUTPUT: 
✔  Data Got Successfully.
{
  status: 'ON',
  title: 'CHANNEL 24 LIVE | LIVE  | সরাসরি চ্যানেল 24 | HD LIVE TV | LIVE STREAMING | BANGLA TV NOW LIVE | TV',
  video_id: 'hm0sDNIunYU'
}
*/

export { checkLiveStatus };
