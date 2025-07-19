export async function waitForVideoMeta(page, timeout = 10000) {
  try {
    await page.waitForFunction(
      () => {
        const titleMeta = document.querySelector('meta[name="title"]');
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        return !!(titleMeta?.content && canonicalLink?.href);
      },
      { timeout }
    );
  } catch (error) {
    console.warn("⚠️ Metadata not found within timeout:", error.message);
    // Still continue – maybe extractVideoInfo() will still get something
  }
}
