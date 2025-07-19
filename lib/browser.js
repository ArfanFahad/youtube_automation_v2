import puppeteer from "puppeteer";

const launchBrowser = async () => {
  return await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
};

export { launchBrowser };
