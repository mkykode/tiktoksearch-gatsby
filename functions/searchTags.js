const TikTokScraper = require("tiktok-scraper")

exports.handler = async (event, context) => {
  let videosUrls = null
  try {
    videosUrls = await TikTokScraper.hashtag(tag, { number: 18 });
  } catch (error) {
    console.log("error", error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error,
        videosUrls: null,
      }),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      error: null,
      videosUrls,
    }),
  }
}
