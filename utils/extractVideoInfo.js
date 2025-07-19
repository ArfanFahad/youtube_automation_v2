const extractVideoInfo = async (page) => {
  return await page.evaluate(() => {
    const title = document.querySelector('meta[name="title"]')?.content;
    const canonical = document.querySelector("link[rel='canonical']")?.href;
    const url = canonical ? new URL(canonical) : null;
    const videoId = url ? url.searchParams.get("v") : null;
    console.log(`Title: ${title}`);
    console.log(`Video ID: ${videoId}`);
    return { title, videoId };
  });
};

export { extractVideoInfo };
