// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const TikTokScraper = require("tiktok-scraper")

exports.handler = async (event, context) => {
  try {
    const videosUrls = await TikTokScraper.trend("", { number: 12 })
    return {
      statusCode: 200,
      body: JSON.stringify({ error: null, videosUrls }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: { error: err.toString(), videosUrls: null },
    }
  }
}
