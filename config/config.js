import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const config = {
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  channelHandle: process.env.YOUTUBE_CHANNEL_HANDLE,
  whatsappGroupName: process.env.WHATSAPP_GROUP_NAME,
  checkInterval: parseInt(process.env.CHECK_INTERVAL_MS, 10) || 20000,
};

if (
  !config.youtubeApiKey ||
  !config.channelHandle ||
  !config.whatsappGroupName
) {
  throw new Error("Missing required environment variables.");
}

export default config;
