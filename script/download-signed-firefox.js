import fs from "node:fs"
import https from "node:https"

import { MozillaAddonsAPI } from "@plasmohq/mozilla-addons-api"

const mozilla = new MozillaAddonsAPI({
  extId: process.env.FIREFOX_ID,
  apiKey: process.env.FIREFOX_API_KEY,
  apiSecret: process.env.FIREFOX_API_SECRET,
  channel: "unlisted"
})

const jwt = await mozilla.getAccessToken()

let upload_info = await fetch(
  `https://addons.mozilla.org/api/v4/addons/${process.env.FIREFOX_ID}/versions/${process.env.FIREFOX_TAG}/`,
  {
    headers: {
      'Authorization': `JWT ${jwt}`
    }
  }
).then(res => res.json());

console.log(upload_info);
const download_url = upload_info.files[0].download_url;

await https.get(
  download_url,
  { headers: { Authorization: `JWT ${jwt}` } },
  (res) => {
    const writeStream = fs.createWriteStream(process.env.OUTPUT_PATH)
    res.pipe(writeStream)
  }
)