import { MozillaAddonsAPI } from "@plasmohq/mozilla-addons-api"

const mozilla = new MozillaAddonsAPI({
  extId: process.env.FIREFOX_ID,
  apiKey: process.env.FIREFOX_API_KEY,
  apiSecret: process.env.FIREFOX_API_SECRET,
  channel: "unlisted"
})

await mozilla.submit({
  filePath: process.env.INPUT_PATH,
  version: process.env.FIREFOX_TAG
})
