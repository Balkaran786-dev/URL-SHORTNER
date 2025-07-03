import { getShorturl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser,createShortUrlWithUser } from "../services/shortUrl.service.js"
import wrapAsync from "../utils/TryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const data = req.body;
  console.log(data)
  let shortUrl
  if(req.user){
    shortUrl = await createShortUrlWithUser(data.url,req.user._id,data.slug);
  }
  else{
    shortUrl = await createShortUrlWithoutUser(data.url);
  }

  res.status(200).json({shorturl:process.env.APP_URL + shortUrl});
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShorturl(id);
  if (!url) throw new Error("Short URL not found");
  res.redirect(url.full_url);
});

export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  const shortUrl = await createShortUrlWithoutUser(url, customUrl);
  res.status(200).json({ shorturl: process.env.APP_URL + shortUrl });
});
//we did the export through const , beacuse there can be multiple exports from this file..default export can only one in single file.